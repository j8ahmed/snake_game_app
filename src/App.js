import './App.scss';
import { useState, useEffect, useRef } from 'react';

export default function App() {
    const [head, setHead] = useState({x: 10, y: 10});
    const [food, setFood] = useState({
        x: Math.floor(Math.random() * 20) + 1,
        y: Math.floor(Math.random() * 20) + 1
    });
    const [segments, setSegments] = useState([])
    const [score, setScore] = useState(0)
    const [hiScore, setHiScore] = useState(0)
    const [direction, setDirection] = useState("right") 
    const [gameSpeed, setGameSpeed] = useState(1000) 
    const gameLoop = useRef(null) 

    function runGame(){
        switch(direction){
            // Move head up
            case "up":
                setHead(head => ({...head, y: head.y--}))
                break;
            // Move head down
            case "down":
                setHead(head => ({...head, y: head.y++}))
                break;
            // Move head right
            case "right":
                setHead(head => ({...head, x: head.x++}))
                break;
            // Move head left
            case "left":
                setHead(head => ({...head, x: head.x--}))
                break;
        }
    }

    function handleKeyPress(e){
        switch(e.key){
            case "k":
                setDirection("up")
                break;
            case "j":
                setDirection("down")
                break;
            case "l":
                setDirection("right")
                break;
            case "h":
                setDirection("left")
                break;
        }
    }

    // checks for collision: return collisionType or false
    function isCollision(){
        // border Collision
        if(head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20)
            return "border"
        else if(head.x === food.x && head.y === food.y)
            return "food"
        for(let i; i < segments.length; ++i){
            const curr = segments[i]
            if (head.x === curr.x && head.y === curr.y)
                return "segment"
        }
        return false
    }

    // Main game loop
    useEffect(() => {
        const collisionType = isCollision()
        console.log(collisionType)
        switch(collisionType){
            case "food":
                setScore(score => score + 10)
                break
            case "border":
                clearInterval(gameLoop.current)
                console.log("game over")
                break
            case "segment":
                clearInterval(gameLoop.current)
                console.log("game over")
                break
        }
    }, [head])

    // Update game loop whenever the direction or the speed is changed
    useEffect(() => {
        clearInterval(gameLoop.current)
        gameLoop.current = setInterval(runGame, gameSpeed)
        return () => {
            clearInterval(gameLoop.current)
        }
    }, [direction, gameSpeed])

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

            </header>

            <main className="game-board">
                <div className="scoreboard">
                    <div className="current-score">
                        <h3 className="">Score</h3>
                        <h3 className="number">{score}</h3>
                    </div>

                    <div className="high-score">
                        <h3 className="">Hi-Score</h3>
                        <h3 className="number">{hiScore}</h3>
                    </div>
                </div>

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
