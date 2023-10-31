import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import './App.css';
import Login from './assets/pages/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './assets/pages/Signup/Signup';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
