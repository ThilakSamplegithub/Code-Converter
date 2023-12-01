import React from 'react';
import '../App.css';

function Code_converter({ isLoading, output, isError }) {
  return (
    <div className='output-container'>
      {isError ? (
        <pre className='output_response'>
          <h1 style={{ color: 'red' }}>Error occurred while processing the code.</h1>
        </pre>
      ) : (
        <pre className='output_response'>
          {isLoading ? <h1>Loading...</h1> : <ol><li>{output}</li></ol>}
        </pre>
      )}
    </div>
  );
}

export default Code_converter;
