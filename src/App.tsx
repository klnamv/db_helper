import React, { useState, useEffect } from 'react';
import { Client } from '@notionhq/client';
import Main from './components/Main';
import DbChat from './components/DbChat';
import './App.css';

const App = () =>{
  const [tryIt, setTryIt] = useState(false);

  const startBattle = () => {
    setTryIt(true);
  };

  return (
    <>
      {!tryIt ? (
        <Main onStart={startBattle} />
      ) : (
        <DbChat />
      )}
      <footer>
      <a href='https://github.com/klnamv'>
        Made with love by @klnamv ✨
      </a>
      </footer>
    </>
  );
}

export default App;
