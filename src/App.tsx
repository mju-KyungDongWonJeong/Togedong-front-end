import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import './App.css';
import Login from './assets/pages/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './assets/pages/Signup/Signup';
import PushUpGameGuide from './assets/modal/PushUpGameGuide';
import SquatGameGuide from './assets/modal/SquatGameGuide';
import Dashboard from './assets/pages/Dashboard';
import MainHeader from './assets/component/MainHeader';

import GameRoom from './assets/pages/Game/GameRoom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Frame>
          <Routes>
            <Route element={<MainHeader />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<GameRoom />} />
              <Route path="/game" />
              <Route path="/setting" />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pushupguide" element={<PushUpGameGuide />} />
            <Route path="/squatguide" element={<SquatGameGuide />} />
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
