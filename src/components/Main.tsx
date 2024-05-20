import '../styles/Main.sass';

interface MainProps {
    onStart: () => void;
    onChat: () => void;
}

const Main = ({ onStart, onChat }: MainProps) => {
    return (
        <div>
            <header>
                <p>DB Chat</p>
                <div className='login'>
                    <p>Sign in</p>
                    <p>Sign up</p>
                </div>
            </header>
            <main>
                <div className='dbchat'>DB Chat</div>
                <p>Chat with your Notion database</p>
                <div className="navigation">
                    <a className='gotodb' onClick={onStart}>Request a demo</a>
                    <p>|</p>
                    <a className='gotochat' onClick={onChat}>Get DB Chat for free</a>
                </div>  
                <img src="https://images.unsplash.com/photo-1681518628435-2b38ba1708d9?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </main>
        </div>
    );
}

export default Main;