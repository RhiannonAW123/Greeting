import './App.css';
import { useState } from 'react';

function App() {

  const [value, setValue] = useState('');
  const [outputString, setOutputString] = useState('');

  const handleValueChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/addHello', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ inputString: value}),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const responseData = await response.json();
      setOutputString(responseData.outputString);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Please enter your name</h1>
      <input type='text' value={value} onChange={(e) => handleValueChange(e)}></input>
      <button onClick={handleSubmit}>Submit</button>

      {outputString && (
        <div>
          <h2>Server Response:</h2>
          <p>{outputString}</p>
        </div>
      )}
    </div>
  );
}

export default App;
