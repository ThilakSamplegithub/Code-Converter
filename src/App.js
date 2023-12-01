import logo from './logo.svg';
import './App.css';
import Code_converter from './Components/Code_converter';
import React,{ useState } from 'react';
import AceEditor from 'react-ace';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-csharp';
// import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-monokai';
import CodeConverterIcon from './Components/codeConverterIcon';
ace.config.set('basePath', '/src');
ace.config.set('workerPath', '');
ace.config.set('modePath', '');
ace.config.set('themePath', '');
function App() {
  const baseUrl=process.env.REACT_APP_API
  // const baseUrl=''
  const [code, setCode] = useState('');
  const [inputLanguage,setLanguage]=useState("javascript")
  const[isLoading,setLoading]=useState(false)
  const[isError,setError]=useState(false)
  const [output, setOutput] = useState('');
 const[targetLanguage,setTargetLanguage]=useState("python")
  const handleCodeGeneration = async() => {
    // Implement code generation logic here
setLoading(true)
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
if(!res.ok){
  setError(true)
}else{
  setError(false)
  let result=await res.json()
  if(result?.convertedCode){
    setLoading(false)
    setOutput(result.convertedCode)
  }
}
  };
  const handleDebug = async() => {
    setLoading(true)
    // Implement debugging logic here
let res=await fetch(`${baseUrl}/debug`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({code})
})
if(!res.ok){
  setError(true)
}else{
  setError(false)
  let data=await res.json()
console.log(data.debugSuggestions,'is debuggedsuggestion')
if(data?.debugSuggestions){
  setLoading(false)
  setOutput(data.debugSuggestions)
}
}
  };
  const handleQualityCheck = async() => {
    setLoading(true)
    // Implement quality check logic here
let res=await fetch(`${baseUrl}/quality`,{
    method:"POST",
    headers:{
        'Content-Type':"application/json"
    },
    body:JSON.stringify({code})
})
if(!res.ok){
  setError(true)
}else{
  setError(false)
  let data=await res.json()
  console.log(data,'quality check')
  if(data?.qualityCheckResult){
    setLoading(false)
    setOutput(data.qualityCheckResult)
  }
}
  };
  return (
    <div className="App action-buttons">
      <div style={{color:"#ecf0f1",fontSize:24,fontFamily:'sans-serif',display:"flex",justifyContent:"flex-start",margin:"0px 10px"}}><CodeConverterIcon/>
      Code Converter</div>
      {/* <div className="action-buttons"> */}
      <div className='buttons_at_top'>
        <div >
          <button onClick={()=>{setCode("");setLanguage("javascript")}}>Switch to javascript</button>
          <button onClick={()=>{setCode("");setLanguage("Java")}}>Switch to Java</button>
          <button onClick={()=>{setCode("");setLanguage("python")}}>Switch to python</button>
          <button onClick={()=>{setCode("");setLanguage("c_cpp")}}>Switch to c</button>
          <button onClick={()=>{setCode("");setLanguage("csharp")}}>Switch to C#</button>
        </div>
        <div >
        <button onClick={handleQualityCheck}>Quality Check</button>
          <button onClick={handleDebug}>Debug</button>
          <button onClick={handleCodeGeneration}>Generate Code</button>
          <select onChange={(e)=>setTargetLanguage(e.target.value)}>
          <option value="">Select language</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
          </select>
        </div>
        </div>
        {/* </div> */}
        <div className='app'>
        <div className="editor">
          <div><h4 style={{backgroundColor:"rgb(39,40,34)",margin:0}}>{inputLanguage}</h4></div>
        
<AceEditor
  mode={inputLanguage.toLowerCase()}
  theme="monokai"
  value={code}
  onChange={(newCode) => setCode(newCode)}
  name="code-editor"
  width="100%"
  height="100%"
  editorProps={{ $blockScrolling: true }}
  fontSize={14}
  showPrintMargin={false}
  enableBasicAutocompletion={true}
  enableLiveAutocompletion={true}
/>

      </div>
      <div className='output'>
      <Code_converter isError={isError} isLoading={isLoading} output={output}/>
      </div>
      </div>
    </div>
  );
}

export default App;
