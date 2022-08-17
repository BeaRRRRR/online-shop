import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { theme } from './styles/theme';
import Home from './pages/Home';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';

export function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            } />
            <Route path="/login" element={<Login />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}



export default App
