import logo from './logo.svg';
import './App.css';
import Message from './Message';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Message text='Это текст, который мы передали пропсом'/>
      </header>
    </div>
  );
}

export default App;
