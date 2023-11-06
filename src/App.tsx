import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import './App.css';
import Login from './assets/pages/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './assets/pages/Signup/Signup';
import SideBar from './assets/component/SideBar';
import PushUpGameGuide from './assets/modal/PushUpGameGuide';
import SquatGameGuide from './assets/modal/SquatGameGuide';
import DashboardBox from './assets/component/DashboardBox';
import attendance from './assets/images/attendance.svg';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Frame>
          <Routes>
            <Route element={<SideBar />}>
              <Route
                path="/dashboard"
                element={
                  <DashboardBox
                    title="출석일수"
                    img={attendance}
                    content="26"
                    desc="총 30일"
                  />
                }
              />
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
