import React, { useState } from 'react'

let score, setScore;
let wicket, setWicket;
let remaining, setRemaining;
let player = 0;
let gameOver = false;
let totalBalls = 12;

function CounterComponent() {
    [score, setScore] = useState([0, 0]);
    [wicket, setWicket] = useState([0, 0]);
    [remaining, setRemaining] = useState(totalBalls);

    let buttons = [];
    for(let i = 0; i <= 6; i++) {
        buttons.push(<button type='button' onClick={()=>addScore(i)}>{i}</button>);
    }

    return (
        <React.Fragment>
            Player 1 Score: {score[0]} - {wicket[0]}<br/>
            Player 2 Score: {score[1]} - {wicket[1]}<br/>
            Number of balls remaining: {remaining}
            <div className='buttons'>
                {buttons}
            </div>
            <div className='buttons'>
                <button type='button' onClick={noBall}>No Ball</button>
                <button type='button' onClick={wideBall}>Wide Ball</button>
                <button type='button' onClick={addWicket}>Wicket</button>
                <button type='button' onClick={newGame}>New Game</button>
            </div>
        </React.Fragment>
    );
}

function newGame() {
    setScore([0, 0]);
    setWicket([0, 0]);
    setRemaining(totalBalls);
    player = 0;
    gameOver = false;
}

function updateScore(i) {
    let s = [...score];
    s[player] += i;
    setScore(s);
}

async function addScore(i){
    if(gameOver) return;
    updateScore(i);
    await setRemaining(remaining - 1);
    if(remaining === 0) {
        playerOut();
    }
}

function playerOut() {
    if(player === 0) {
        player = 1;
        setRemaining(totalBalls);
    } else {
        if(score[0] > score[1]) {
            alert('Player 1 wins');
        } else if(score[0] < score[1]) {
            alert('Player 2 wins');
        } else {
            alert('Draw');
        }
        gameOver = true;
    }
}

function noBall(){
    if(gameOver) return;
    updateScore(1);
}
function wideBall(){
    if(gameOver) return;
    updateScore(1);
}

async function addWicket(){
    if(gameOver) return;
    let w = [...wicket];
    w[player] += 1;
    await setWicket(w);
    if(w[player] === 10) {
        playerOut();
    }
}

export default CounterComponent;