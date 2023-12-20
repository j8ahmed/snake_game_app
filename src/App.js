import './App.scss';

export default function App() {
    return (
        <div className="App">
            <header className="">
                <h1 className="title">Vim Snake Game</h1>

                <div className="scoreboard">
                    <div className="current-score">
                        <h3 className="">Score</h3>
                        <h3 className="number">000</h3>
                    </div>

                    <div className="high-score">
                        <h3 className="">Hi-Score</h3>
                        <h3 className="number">000</h3>
                    </div>
                </div>
            </header>

            <main className="game-board">
                <div className="snake-segment head"></div>
                <div className="snake-segment"></div>
                <div className="food"></div>
            </main>
        </div>
    );
}
