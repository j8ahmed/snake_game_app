import './App.scss';
import { useState, useEffect, useRef } from 'react';

export default function App() {
    // manage game state: "start", "inGame", "end"
    const [gameState, setGameState] = useState("start")
    const [food, setFood] = useState({x: 0, y: 0});
    const [segments, setSegments] = useState([{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}])
    const [score, setScore] = useState(0)
    const [hiScore, setHiScore] = useState(0)
    const [direction, setDirection] = useState("right") 
    const [gameSpeed, setGameSpeed] = useState(500) 
    const gameLoop = useRef(null) 

    function moveSnake(){
        setSegments(segments => {
            const head = segments[0]
            let newHead;
            switch(direction){
                case "up":
                    newHead = {...head, y: head.y - 1}
                    break;
                case "down":
                    newHead = ({...head, y: head.y + 1})
                    break;
                case "right":
                    newHead = {...head, x: head.x + 1}
                    break;
                case "left":
                    newHead = {...head, x: head.x - 1}
                    break;
            }
            /*
             * represent snake movements by: 
             * 1. adding 1 new segment to the front of the segments list
             * 2. removing 1 old segment from the end of the segments list
             * The net difference will be zero but it will appear as though 
             * all the segments have shifted on position over.
             * In reality the snake segments are like a growing history of 
             * the snake head movements
             */
            if(segments.length === 1){
                return [newHead]
            }
            else if(segments.length > 1){
                const newSegments = [...segments]
                newSegments.unshift(newHead)
                newSegments.pop()
                return newSegments
            }
        })
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
            case " ":
                if (gameState === "start")
                    startGame()
                else if (gameState === "end")
                    restartGame()
                break;
            default:
        }
    }

    // checks for collision: return collisionType or false
    function isCollision(point){
        // border Collision
        if(point.x < 1 || point.x > 20 || point.y < 1 || point.y > 20)
            return "border"
        else if(point.x === food.x && point.y === food.y)
            return "food"
        for(let i=1; i < segments.length; ++i){
            const curr = segments[i]
            if (point.x === curr.x && point.y === curr.y)
                return "segment"
        }
        return false
    }

    function placeFood(){
        setFood(food => {
            let newPoint = {
                x: Math.floor(Math.random() * 20) + 1,
                y: Math.floor(Math.random() * 20) + 1
            }
            while (isCollision(newPoint) !== false){
                newPoint.x = Math.floor(Math.random() * 20) + 1
                newPoint.y = Math.floor(Math.random() * 20) + 1
            }
            return newPoint
        })
    }

    function startGame(){
        setGameState("inGame")
        setSegments([{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}])
        placeFood()
    }

    function restartGame(){
        clearInterval(gameLoop)
        setScore(0)
        setGameSpeed(500)
        setDirection("right")
        setSegments([{x: 10, y: 10}])
        startGame()
    }

    // Main game loop
    useEffect(() => {
        const head = segments[0]
        const collisionType = isCollision(head)
        switch(collisionType){
            case "food":
                setScore(score => score + 10)
                setSegments(segments => {
                    const newSegments = [...segments]
                    newSegments.push(segments[segments.length - 1])        // Add a filler piece to negate the removal of the tail with each snake movement
                    return newSegments
                })
                placeFood()
                // speed up game
                setGameSpeed(gameSpeed => gameSpeed * 0.95)
                break
            case "border":
                clearInterval(gameLoop.current)
                setGameState("end")
                break
            case "segment":
                clearInterval(gameLoop.current)
                setGameState("end")
                if (score > hiScore)
                    setHiScore(score)
                break
            default:
        }
    }, [segments])

    // Update game loop whenever the direction or the speed is changed
    useEffect(() => {
        if (gameState == "inGame"){
            clearInterval(gameLoop.current)
            gameLoop.current = setInterval(moveSnake, gameSpeed)
        }
        return () => {
            clearInterval(gameLoop.current)
        }
    }, [gameState, direction, gameSpeed])

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

                {
                    gameState === "start" ?
                        <div className="board start-screen">
                            <h2>Press the "Space" key to start the game.</h2>
                        </div>
                    : gameState === "end" ?
                        <div className="board end-screen">
                            <h3>Game Over</h3>
                            <h4>Score: <span className="accent">{score}</span></h4>
                            <button onClick={restartGame}>Restart</button>
                        </div>
                    :
                        <div className="board">
                            {
                                segments.map((segment, i) => {
                                    return (
                                        <div key={i} className={`snake-segment ${i === 0 && "head"}`} style={{
                                            gridColumn: segment.x,
                                            gridRow: segment.y,
                                        }}></div>
                                    )
                                })
                            }
                            <div className="food" style={{
                                gridColumn: food.x,
                                gridRow: food.y,
                            }}></div>
                        </div>
                }
            </main>

            <div className="instructions">
                <p>"k" = up</p>
                <p>"j" = down</p>
                <p>"l" = right</p>
                <p>"h" = left</p>
            </div>
            <p>Built By: <a href="https://j8ahmed.com/">Jamal J8</a></p>
        </div>
    );
}
