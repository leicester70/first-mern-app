import SignUpForm from './components/forms/SignUpForm'
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme'
import './styles/normalize.module.css'
import './styles/main.module.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <h1>First MERN Stack App :D</h1>
          <SignUpForm></SignUpForm>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
