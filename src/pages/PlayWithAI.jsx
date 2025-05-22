import { useState, useEffect } from 'react';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import RulesModal from './Rules';
import '@/pages/css/PlayWithAI.scss';

const checkWin = (board) => {
  const lines = [
    ...Array(3).fill().map((_, l) =>
      Array(3).fill().map((_, r) => [[l, r, 0], [l, r, 1], [l, r, 2]])
    ),
    ...Array(3).fill().map((_, l) =>
      Array(3).fill().map((_, c) => [[l, 0, c], [l, 1, c], [l, 2, c]])
    ),
    ...Array(3).fill().map((_, r) =>
      Array(3).fill().map((_, c) => [[0, r, c], [1, r, c], [2, r, c]])
    ),
    ...Array(3).fill().map((_, l) => [
      [[l, 0, 0], [l, 1, 1], [l, 2, 2]],
      [[l, 0, 2], [l, 1, 1], [l, 2, 0]]
    ]),
    [[[0, 0, 0], [1, 1, 1], [2, 2, 2]], [[0, 0, 2], [1, 1, 1], [2, 2, 0]]],
    [[[0, 2, 0], [1, 1, 1], [2, 0, 2]], [[0, 2, 2], [1, 1, 1], [2, 0, 0]]]
  ].flat();

  for (const line of lines) {
    const [a, b, c] = line;
    if (
      board[a[0]][a[1]][a[2]] &&
      board[a[0]][a[1]][a[2]] === board[b[0]][b[1]][b[2]] &&
      board[a[0]][a[1]][a[2]] === board[c[0]][c[1]][c[2]]
    ) {
      return { winner: board[a[0]][a[1]][a[2]], line };
    }
  }
  return null;
};

const getRandomMove = (board) => {
  const available = [];
  for (let l = 0; l < 3; l++) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (!board[l][r][c]) available.push([l, r, c]);
      }
    }
  }
  return available[Math.floor(Math.random() * available.length)];
};

const getWinningMove = (board, player) => {
  for (let l = 0; l < 3; l++) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (!board[l][r][c]) {
          const testBoard = board.map(l => l.map(r => [...r]));
          testBoard[l][r][c] = player;
          if (checkWin(testBoard)?.winner === player) return [l, r, c];
        }
      }
    }
  }
  return null;
};

const getAIMove = (board, difficulty) => {
  if (difficulty === 'easy') return getRandomMove(board);
  if (difficulty === 'medium') {
    return getWinningMove(board, 'O') || getRandomMove(board);
  }
  return getWinningMove(board, 'O') || getWinningMove(board, 'X') || getRandomMove(board);
};

function PlayWithAI() {
  const [board, setBoard] = useState(Array(3).fill().map(() => Array(3).fill().map(() => Array(3).fill(null))));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (currentPlayer === 'O' && !winner) {
      const [l, r, c] = getAIMove(board, difficulty);
      const newBoard = board.map(l => l.map(r => [...r]));
      newBoard[l][r][c] = 'O';
      setBoard(newBoard);
      const result = checkWin(newBoard);
      if (result) {
        setWinner(result.winner);
        setWinningLine(result.line);
      } else {
        setCurrentPlayer('X');
      }
    }
  }, [currentPlayer, board, winner, difficulty]);

  const handleClick = (layer, row, col) => {
    if (board[layer][row][col] || winner || currentPlayer !== 'X') return;

    const newBoard = board.map(l => l.map(r => [...r]));
    newBoard[layer][row][col] = 'X';
    setBoard(newBoard);

    const result = checkWin(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else {
      setCurrentPlayer('O');
    }
  };

  const resetGame = () => {
    setBoard(Array(3).fill().map(() => Array(3).fill().map(() => Array(3).fill(null))));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
  };

  const isWinningCell = (l, r, c) => {
    if (!winningLine) return false;
    return winningLine.some(([wl, wr, wc]) => wl === l && wr === r && wc === c);
  };

  return (
    <div className="game-container">
      <div className="navbar">
        <Link to="/" className="nav-button">
          <ArrowLeftIcon width={20} /> Back
        </Link>
        <h1 className="heading">Play with AI</h1>
        <div>
          <button className="rules-button" onClick={() => setShowRules(true)}>Rules & Tips</button>
          <button className="reset-button" onClick={resetGame}>Reset</button>
        </div>
      </div>
      <select
        className="difficulty-selector margin-top-60"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <h2 className="player-display">Current Player: {currentPlayer}</h2>
      <div className="controls">
        <button className="control-button" onClick={() => setRotateX(x => x + 10)}>Rotate X +</button>
        <button className="control-button" onClick={() => setRotateX(x => x - 10)}>Rotate X -</button>
        <button className="control-button" onClick={() => setRotateY(y => y + 10)}>Rotate Y +</button>
        <button className="control-button" onClick={() => setRotateY(y => y - 10)}>Rotate Y -</button>
      </div>
      <div className="board-container">
        <div className="holo-projector">
          <div
            className="board"
            style={{
              transform: `rotateX(${rotateX + 57}deg) rotateY(${rotateY + 1}deg)`
            }}
          >
            {board.map((layer, l) => (
              <div key={l} className={`layer layer-${l}`} style={{ transform: `translateZ(${(2 - l) * 150}px)`, opacity: 1 - (l * 0.1) }}>
                {layer.map((row, r) =>
                  row.map((cell, c) => (
                    <div
                      key={`${l}-${r}-${c}`}
                      className={`cell ${isWinningCell(l, r, c) ? 'cell-winning' : ''}`}
                      onClick={() => handleClick(l, r, c)}
                    >
                      {cell}
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {winner && (
        <>
          <div className="win-message">Winner: {winner}</div>
          <div className="win-star">
            <StarIcon width={48} />
          </div>
        </>
      )}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
}

export default PlayWithAI;