import { useState } from 'react';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import RulesModal from './Rules';
import '../pages/css/TwoPlayer.scss';

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

function TwoPlayer() {
  const [board, setBoard] = useState(Array(3).fill().map(() => Array(3).fill().map(() => Array(3).fill(null))));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const handleClick = (layer, row, col) => {
    if (board[layer][row][col] || winner) return;

    const newBoard = board.map(l => l.map(r => [...r]));
    newBoard[layer][row][col] = currentPlayer;
    setBoard(newBoard);

    const result = checkWin(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
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
        <h1 className="heading">2 Player Mode</h1>
        <div>
          <button className="rules-button" onClick={() => setShowRules(true)}>Rules & Tips</button>
          <button className="reset-button" onClick={resetGame}>Reset</button>
        </div>
      </div>
      <h2 className="player-display margin-top-60">Current Player: {currentPlayer}</h2>
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

export default TwoPlayer;