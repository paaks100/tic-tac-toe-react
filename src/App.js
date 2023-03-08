import { useEffect, useState } from 'react';
import './App.css';
import { Square } from './components/Square';
import { Patterns } from './Patterns';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({winner: "none", state: "none"});

  useEffect(() => {
    checkWin();
    checkIfTied();
    // change to next player
    (player == "X") ? setPlayer("O") : setPlayer("X");

  }, [board]);

  useEffect(() => {
    (result.state != "none") && alert(`Game Over! ${result.winner} has won`);
    restartGame();
  }, [result])

  const chooseSquare = (square) => {
    //set square value to X or O
    setBoard(board.map((val, index) =>
      (index == square && val == "") ? player : val
    ));

  }

  //check if player has won
  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;

      currPattern.forEach((index) => 
        (board[index] != firstPlayer) && (foundWinningPattern = false)
      )

      foundWinningPattern && setResult({winner: player, state: "won"})
    })
  }

  const checkIfTied = () => {
    let filled = true;
    board.forEach((square) => {(square == "") && (filled = false)})
    filled && setResult({winner: "Nobody", state: "tie"})
  }

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  }
  
  return (
    <div className="App">
      <div className='board'>
        <div className='row'>
          <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
          <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
          <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
        </div>

        <div className='row'>
          <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
          <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
          <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
        </div>

        <div className='row'>
          <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
          <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
          <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
        </div>
      </div>
    </div>
  );
}

export default App;
