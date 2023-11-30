
import React, { useState } from 'react';
import '../App.css';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-text';
// import 'ace-autocompleter';
// import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
function Code_converter() {
    const baseUrl=process.env.REACT_APP_API
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
 const[targetLanguage,setTargetLanguage]=useState("python")
  const handleQualityCheck = async() => {
    // Implement quality check logic here
let res=await fetch(`${baseUrl}/quality`,{
    method:"POST",
    headers:{
        'Content-Type':"application/json"
    },
    body:JSON.stringify({code})
})
let data=await res.json()
console.log(data,'quality check')
setOutput(data.qualityCheckResult)
  };

  const handleDebug = async() => {
    // Implement debugging logic here
let res=await fetch(`${baseUrl}/debug`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({code})
})
let data=await res.json()
console.log(data.debugSuggestions,'is debuggedsuggestion')
setOutput(data.debugSuggestions)
  };

  const handleCodeGeneration = async() => {
    // Implement code generation logic here
    const data={
        code,targetLanguage
    }
let res=await fetch(`${baseUrl}/convert`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
})
let result=await res.json()
console.log(result.convertedCode)
setOutput(result.convertedCode)
  };

  return (
    <div className="app">
      <div className="editor">
        <AceEditor
          mode="text"
          theme="monokai"
          value={code}
          onChange={(newCode) => setCode(newCode)}
          name="code-editor"
          width="100%"
          height="100%"
        //   height="300px"
      fontSize={14}
      showPrintMargin={false}
          enableBasicAutocompletion={true} // Enable basic autocompletion
      enableLiveAutocompletion={true} // Enable live autocompletion
        />
      </div>
      <div className="output">
      <div className="action-buttons">
          <button onClick={handleQualityCheck}>Quality Check</button>
          <button onClick={handleDebug}>Debug</button>
          <button onClick={handleCodeGeneration}>Generate Code</button>
          <select onChange={(e)=>setTargetLanguage(e.target.value)}>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
          </select>
        </div>
        <div className="markdown-output">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default Code_converter
