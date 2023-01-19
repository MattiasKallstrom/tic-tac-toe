import React, { useState } from "react";
import "./TicTacToe.css";

const Cell = ({ value, onClick }) => {
  return <button onClick={onClick}>{value}</button>;
};

const Board = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cell key={index} value={cell} onClick={() => onCellClick(index)} />
      ))}
    </div>
  );
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(currentPlayer);
      }
    }
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe">
      <Board board={board} onCellClick={handleCellClick} />
      {winner ? (
        <p>The winner is {winner}</p>
      ) : (
        !board.includes(null) && <p>It's a draw!</p>
      )}
      {winner || !board.includes(null) ? (
        <button onClick={handleNewGame}>New Game</button>
      ) : null}
    </div>
  );
};

export default TicTacToe;
