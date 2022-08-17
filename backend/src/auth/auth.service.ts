import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signup.dto';
import { compare } from 'bcrypt';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtTokenService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.userService.findByUsername(username);

        if (user && (await compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login({ username, password }: { username: string, password: string }) {
        const doc = await this.userService.findByUsername(username);
        if (!doc) throw new Error(`User with this username doesn't exist`)
        const payload = {
            id: doc.toObject()._id.toString(),
            role: doc.toObject().role,
        };
        const expiresIn = process.env.NODE_ENV === 'development' ? '24h' : '30m';

    return {
      access_token: this.jwtTokenService.sign(payload, { expiresIn }),
    };
  }

  async signup(user: SignUpDto) {
    const existingUser = await this.userService.findByUsername(user.username);
    if (existingUser) {
      throw new ForbiddenException('User with this username already exists');
    }
    return this.userService.create(user);
  }
}
