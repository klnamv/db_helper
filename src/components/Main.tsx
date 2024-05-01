import '../styles/Main.scss';

interface MainProps {
    onStart: () => void;
    onChat: () => void;
}

const Main = ({ onStart, onChat }: MainProps) => {
    return (
        <>
            <h1>DB Chat</h1>
            <div className="navigation">
                <button className='gotodb' onClick={onStart}>Go to DB</button>
                <button className='gotochat' onClick={onChat}>Go to Chat</button>
            </div>
        </>
    );
}

export default Main;