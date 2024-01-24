import './App.css';
import { useState } from 'react';

function App() {

  const [value, setValue] = useState('');

  const handleValueChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    console.log(value)
  }

  return (
    <div>
      <h1>Please enter your name</h1>
      <input type='text' value={value} onChange={(e) => handleValueChange(e)}></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App;
