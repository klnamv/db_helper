import { useState } from 'react';
import Main from './components/Main';
import DbChat from './components/DbChat';
import Chat from './components/Chat';
import './App.css';

const App = () => {

  const [showDb, setShowDb] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const goToDb = () => {
    setShowDb(true);
    setShowChat(false); 
  };

  const goToChat = () => {
    setShowChat(true);
    setShowDb(false);
  };

  return (
    <>
      {!showDb && !showChat ? (
        <Main onStart={goToDb} onChat={goToChat} />
      ) : showDb ? (
        <DbChat />
      ) : (
        <Chat />
      )}
      <footer>
        <a href='https://github.com/klnamv'>
          Made with love by @klnamv ✨
        </a>
      </footer>
    </>
  )
}

export default App;
