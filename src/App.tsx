import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import './App.css';
import Login from './assets/pages/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './assets/pages/Signup/Signup';
import SideBar from './assets/component/SideBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Frame>
          <Routes>
            <Route element={<SideBar />}>
              <Route path="/dashboard" />
              <Route path="/game" />
              <Route path="/setting" />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Frame>
      </Router>
    </ThemeProvider>
  );
}

export default App;

const Frame = styled.div`
  display: flex;
`;
