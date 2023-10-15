import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import './App.css';
import ChallengeApply from './assets/modal/ChallengeApply';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Divv>
        <ChallengeApply />
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
