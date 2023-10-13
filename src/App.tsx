import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import './App.css';

function App() {
  return <ThemeProvider theme={theme}></ThemeProvider>;
}

export default App;
