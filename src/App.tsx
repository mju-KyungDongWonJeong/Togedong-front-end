import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import PushUpGameGuide from './assets/modal/PushUpGameGuide';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Divv></Divv>
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
