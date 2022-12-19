import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fn = (event) => {
      console.log(':::::Child:::::', event.data);
    };
    window.addEventListener('message', fn);
    return () => {
      window.removeEventListener('message', fn);
    };
  }, []);
  const sendToParent = () => {
    window.parent.postMessage(
      {
        child: count,
      },
      '*'
    );
  };
  return (
    <div className='App'>
      <button onClick={sendToParent}>Send To Parent</button>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
