import { useState } from 'react';
import Main from './components/Main';
import DbChat from './components/DbChat';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


import './App.css';

const App = () => {

  const [showDb, setShowDb] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const goToDb = () => {
    setShowDb(true);
    setShowChat(false); 
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const goToChat = () => {
    setShowChat(true);
    setShowDb(false);
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const goToSignIn = () => {
    setShowChat(false);
    setShowDb(false);    
    setShowSignIn(true);
    setShowSignUp(false);
  }

  const goToSignUp = () => {
    setShowChat(false);
    setShowDb(false);    
    setShowSignIn(false);
    setShowSignUp(true);
  }

  return (
    <div className='app'>
      {!showDb && !showChat && !showSignIn && !showSignUp ? (
        <Main onStart={goToDb} onChat={goToChat} onSignIn={goToSignIn} onSignUp={goToSignUp}/>
      ) : showDb ? (
        <DbChat />
      ) : showChat ? (
        <Chat />
      ) : showSignIn ? (
        <SignIn />
      ) : (
        <SignUp />
      )}
      <footer>
        <a href='https://github.com/klnamv'>
          Made with love by @klnamv ✨
        </a>
      </footer>
    </div>
  )
}

export default App;
