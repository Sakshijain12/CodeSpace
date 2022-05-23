import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [code, setCode] = useState('');
  const [language, setlanguage] = useState("cpp");
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
    try {
      const {data} = await axios.post("http://localhost:8000/run", payload);
      setOutput(data.output);
    } catch({response}){
      if(response){
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
        console.log(response);
      } else{
        setOutput("Error connecting to server!");
      }
    }
  };

  return (
    <div>
      <h1>Online Code Compiler</h1>
      <div>
        <label>Language: </label>
        <select
          value={language}
          onChange = {
            (e) => {
              setlanguage(e.target.value);
            }
          }>
          <option value = "cpp">C++</option>
          <option value = "py">Python</option>
        </select>
        <button onClick={handleSubmit}>Run</button>
      </div>
      
      <div>
      <textarea
        rows = "35"
        cols= "750" 
        value = {code} 
        onChange = {(e) =>{
          setCode(e.target.value);
        }}>
      </textarea>
      <p>Here is the output : <br></br>{output}</p>
      </div>
    </div>
  );
}

export default App;
