import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { updateAccessToken } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../http/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    try {
      const resp = await login({ username, password });
      dispatch(
        updateAccessToken({
          token: (resp as { data: { access_token: string } }).data.access_token,
        })
      );
      navigate('/');
    } catch (e) {
      console.log('error', e);
    }
  }

  return (
    <Box>
      <Paper
        elevation={10}
        sx={{ p: 6, height: 600, width: 500, m: '20px auto' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 5 }}>
          <Avatar sx={{ bgcolor: 'success.main' }}>
            {' '}
            <LockOutlinedIcon />{' '}
          </Avatar>
        </Box>
        <TextField
          sx={{ pb: 5 }}
          label={'Username'}
          placeholder={'Enter username'}
          fullWidth
          required
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          type={'password'}
          label={'Password'}
          placeholder={'Enter password'}
          fullWidth
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <FormControlLabel
          control={<Checkbox name={'checkbox'} color={'primary'} />}
          label={'Remember me'}
        />
        <Button
          sx={{ mt: 10 }}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          fullWidth
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Box
          sx={{
            textDecoration: 'underline',
            '&:hover': {
              color: 'red',
              backgroundColor: 'white',
            },
          }}
        >
          <Typography>
            <Link to={'/#'}>Forgot password?</Link>
          </Typography>
          <Typography>
            <Link to={'/#'}>Sign Up</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
