import '../styles/Main.sass';
import logo from '../assets/logo.svg';

interface MainProps {
    onSignUp: () => void;
    onSignIn: () => void;
    onStart: () => void;
    onChat: () => void;
}

const Main = ({ onStart, onChat, onSignIn, onSignUp }: MainProps) => {
    return (
        <div className='main-container'>
            <header>
                <img src={logo} alt='logo' />
                <div className='auth'>
                    <div className='signin' onClick={onSignIn}>Sign in</div>
                    <div className='separator'>|</div>
                    <div className='signup' onClick={onSignUp}>Sign up</div>
                </div>
            </header>
            <main>
                <div className='dbchat'>DB Chat</div>
                <div className='slogan'>Chat with your Notion database</div>
                <div className="navigation">
                    <a className='gotodb' onClick={onStart}>Request a demo</a>
                    <div className='separator'>|</div>
                    <a className='gotochat' onClick={onChat}>Get DB Chat for free</a>
                </div>  
                <img src="https://images.unsplash.com/photo-1681518628435-2b38ba1708d9?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </main>
        </div>
    );
}

export default Main;