import { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const GameContainer = styled.div`
  background-color: #212121;
  color: #26A69A;
  height: 97vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Board = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
`;

const Layer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 5px;
`;

const Cell = styled.div`
  width: 80px;
  height: 80px;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  border: 1px solid #26A69A;
  &:hover {
    background-color: #444;
  }
`;

const BackButton = styled(Link)`
  color: #26A69A;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
`;

const checkWin = (board) => {
    const lines = [
      // Horizontal lines (each layer)
      ...Array(3).fill().map((_, l) =>
        Array(3).fill().map((_, r) => [[l, r, 0], [l, r, 1], [l, r, 2]])
      ),
      // Vertical lines (each layer)
      ...Array(3).fill().map((_, l) =>
        Array(3).fill().map((_, c) => [[l, 0, c], [l, 1, c], [l, 2, c]])
      ),
      // Depth lines (across layers)
      ...Array(3).fill().map((_, r) =>
        Array(3).fill().map((_, c) => [[0, r, c], [1, r, c], [2, r, c]])
      ),
      // Diagonals (layer-wise)
      ...Array(3).fill().map((_, l) => [
        [[l, 0, 0], [l, 1, 1], [l, 2, 2]],
        [[l, 0, 2], [l, 1, 1], [l, 2, 0]]
      ]),
      // 3D diagonals
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
        return board[a[0]][a[1]][a[2]];
      }
    }
    return null;
};

function TwoPlayer() {
  const [board, setBoard] = useState(Array(3).fill().map(() => Array(3).fill().map(() => Array(3).fill(null))));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (layer, row, col) => {
    if (board[layer][row][col] || winner) return;

    const newBoard = board.map(l => l.map(r => [...r]));
    newBoard[layer][row][col] = currentPlayer;
    setBoard(newBoard);

    const result = checkWin(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(3).fill().map(() => Array(3).fill().map(() => Array(3).fill(null))));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <GameContainer>
      <BackButton to="/"><ArrowLeftIcon width={20} /> Back</BackButton>
      <h1>2 Player Mode</h1>
      <h2>Current Player: {currentPlayer}</h2>
      {winner && <h2>Winner: {winner}</h2>}
      <Board>
        {board.map((layer, l) => (
          <Layer key={l}>
            {layer.map((row, r) =>
              row.map((cell, c) => (
                <Cell key={`${l}-${r}-${c}`} onClick={() => handleClick(l, r, c)}>
                  {cell}
                </Cell>
              ))
            )}
          </Layer>
        ))}
      </Board>
      <button onClick={resetGame} style={{ backgroundColor: '#26A69A', color: '#212121', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
        Reset Game
      </button>
    </GameContainer>
  );
}

export default TwoPlayer;