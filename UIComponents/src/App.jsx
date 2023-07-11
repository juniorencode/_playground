import { InputText } from './components/InputText';
import { InputPassword } from './components/InputPassword';
import { InputTextarea } from './components/InputTextarea';
import './App.css';

function App() {
  return (
    <div className="container">
      <InputText />
      <InputPassword />
      <InputTextarea />
    </div>
  );
}

export default App;
