import './App.scss';
import { useState, useEffect } from 'react';

export default function App() {
    const [head, setHead] = useState({x: 10, y: 10});
    const [food, setFood] = useState({
        x: Math.floor(Math.random() * 20) + 1,
        y: Math.floor(Math.random() * 20) + 1
    });

    const segments = []

    function handleKeyPress(e){
        switch(e.key){
            // Move head up
            case "k":
                setHead(head => ({...head, y: head.y--}))
                break;
            // Move head down
            case "j":
                setHead(head => ({...head, y: head.y++}))
                break;
            // Move head right
            case "l":
                setHead(head => ({...head, x: head.x++}))
                break;
            // Move head left
            case "h":
                setHead(head => ({...head, x: head.x--}))
                break;
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", handleKeyPress)
        return () => {
            window.removeEventListener("keypress", handleKeyPress)
        }
    }, [])

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
                <div className="board">
                    <div className="snake-segment head" style={{
                        gridColumn: head.x,
                        gridRow: head.y,
                    }}></div>
                    {
                        segments.map((segment, i) => {
                            return (
                                <div key={i} className="snake-segment"></div>
                            )
                        })
                    }
                    <div className="food" style={{
                        gridColumn: food.x,
                        gridRow: food.y,
                    }}></div>
                </div>
            </main>
        </div>
    );
}
