import { useState } from 'react';
import FetchData from '../components/FetchData'
import '../styles/Header.css'




function Header() {

    const [score,setScore] = useState(0);
    const [highScore,setHighScore] = useState(0);


    return(
        <>
         <div className="header" >
            <h1 className="title">Pokemon Memory Game</h1>
            <div className="score-box" >
                <h3 className="score">Score : {score}</h3>
                <h3 className="high-score">| High Score : {highScore} </h3>
                  
            </div>
         </div>
         <FetchData score = {score} setScore = {setScore} highScore = {highScore} setHighScore = {setHighScore}/>
        </>
    )
}



export default Header;