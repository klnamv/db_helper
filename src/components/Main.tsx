interface MainProps {
    onStart: () => void;
}

const Main = ({ onStart }: MainProps) => {
    return (
        <div className="container">
            <h1>DB Chat</h1>
            <div className="navigation">
                <button onClick={onStart}>Get DB Chat for free</button>
            </div>
        </div>
    );
}

export default Main;