import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import './App.css';
import CreateRoom from './assets/modal/CreateRoom';

import ChallengeApply from './assets/modal/ChallengeApply';
import SmallButton from './assets/component/SmallButton';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Divv>
        <CreateRoom />
        {/* <ChallengeApply /> */}
        <SmallButton text="방 생성하기" />
      </Divv>
    </ThemeProvider>
  );
}

export default App;

const Divv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
