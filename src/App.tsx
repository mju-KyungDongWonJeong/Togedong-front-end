import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import './App.css';
import SearchInput from './assets/component/SearchInput';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SearchInput />
    </ThemeProvider>
  );
}

export default App;
