import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import './App.css';
import Login from './assets/pages/Login/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Signup from './assets/pages/Signup/Signup';
import PushUpGameGuide from './assets/modal/PushUpGameGuide';
import SquatGameGuide from './assets/modal/SquatGameGuide';
import Dashboard from './assets/pages/Dashboard';
import GameList from './assets/pages/GameList';
import MainHeader from './assets/component/MainHeader';
import SquatGameRoom from './assets/pages/Game/SquatGameRoom';
import PushUpGameRoom from './assets/pages/Game/PushUpGameRoom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Frame>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<MainHeader />}>
              <Route path="/dashboard/:userName" element={<Dashboard />} />
              <Route path="/gamelist" element={<GameList />} />
              <Route path="/setting" />
            </Route>
            <Route
              path="/squatgameroom/:roomManager"
              element={<SquatGameRoom />}
            />
            <Route
              path="/pushupgameroom/:roomManager"
              element={<PushUpGameRoom />}
            />
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
