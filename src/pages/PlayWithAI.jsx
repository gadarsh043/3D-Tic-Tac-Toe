import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import RulesModal from './Rules';

const GameContainer = styled.div`
  background: linear-gradient(135deg, #0A0A23 0%, #1a1a3d 100%);
  color: #00D4FF;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const NavButton = styled(Link)`
  color: #00D4FF;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  &:hover {
    text-shadow: 0 0 10px #00D4FF;
  }
`;

const ResetButton = styled.button`
  background: none;
  border: 2px solid #D500F9;
  color: #D500F9;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  &:hover {
    background: #D500F9;
    color: #0A0A23;
    box-shadow: 0 0 15px #D500F9;
  }
`;

const RulesButton = styled.button`
  background: none;
  border: 2px solid #D500F9;
  color: #D500F9;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  margin-right: 10px;
  &:hover {
    background: #D500F9;
    color: #0A0A23;
    box-shadow: 0 0 15px #D500F9;
  }
`;

const Heading = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  text-align: center;
  flex: 1;
  margin: 0;
  text-shadow: 0 0 10px #00D4FF;
`;

const PlayerDisplay = styled.h2`
  font-family: 'Orbitron', sans-serif;
  background: rgba(0, 212, 255, 0.1);
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #00D4FF;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
  margin: 10px 0;
`;

const DifficultySelector = styled.select`
  background: none;
  border: 2px solid #00D4FF;
  color: #00D4FF;
  padding: 5px;
  border-radius: 5px;
  margin: 10px 0;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  &:hover, &:focus {
    background: rgba(0, 212, 255, 0.2);
    box-shadow: 0 0 10px #00D4FF;
    outline: none;
  }
  option {
    background: #0A0A23;
    color: #00D4FF;
  }
`;

const BoardContainer = styled.div`
  perspective: 1200px; /* Increased perspective for better visibility */
  margin: 20px 0;
`;

const Board = styled.div`
  display: flex;
  grid-template-rows: repeat(3, 1fr);
  gap: 25px; /* Increased gap to prevent overlap */
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
`;

const Layer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 5px;
  background: rgba(0, 212, 255, 0.05);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  animation: float 3s ease-in-out infinite;
  @keyframes float {
    0% { transform: translateZ(0); }
    50% { transform: translateZ(10px); }
    100% { transform: translateZ(0); }
  }
`;

const Cell = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.isWinning ? 'rgba(213, 0, 249, 0.5)' : 'rgba(0, 212, 255, 0.1)'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  border: 2px solid #00D4FF;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(0, 212, 255, 0.3);
    box-shadow: 0 0 15px #00D4FF;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const ControlButton = styled.button`
  background: none;
  border: 2px solid #00D4FF;
  color: #00D4FF;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  &:hover {
    background: #00D4FF;
    color: #0A0A23;
    box-shadow: 0 0 15px #00D4FF;
  }
`;

const WinMessage = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Orbitron', sans-serif;
  font-size: 32px;
  color: #D500F9;
  text-shadow: 0 0 10px #D500F9;
  animation: fadeIn 1s ease-in;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

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
    <GameContainer>
      <Navbar>
        <NavButton to="/"><ArrowLeftIcon width={20} /> Back</NavButton>
        <Heading>Play with AI</Heading>
        <div>
          <RulesButton onClick={() => setShowRules(true)}>Rules & Tips</RulesButton>
          <ResetButton onClick={resetGame}>Reset</ResetButton>
        </div>
      </Navbar>
      <DifficultySelector value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </DifficultySelector>
      <PlayerDisplay>Current Player: {currentPlayer}</PlayerDisplay>
      <BoardContainer>
        <Board
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          }}
        >
          {board.map((layer, l) => (
            <Layer key={l}>
              {layer.map((row, r) =>
                row.map((cell, c) => (
                  <Cell
                    key={`${l}-${r}-${c}`}
                    onClick={() => handleClick(l, r, c)}
                    style={{
                      background: isWinningCell(l, r, c) ? 'rgba(213, 0, 249, 0.5)' : 'rgba(0, 212, 255, 0.1)'
                    }}
                  >
                    {cell}
                  </Cell>
                ))
              )}
            </Layer>
          ))}
        </Board>
      </BoardContainer>
      <Controls>
        <ControlButton onClick={() => setRotateX(x => x + 10)}>Rotate X +</ControlButton>
        <ControlButton onClick={() => setRotateX(x => x - 10)}>Rotate X -</ControlButton>
        <ControlButton onClick={() => setRotateY(y => y + 10)}>Rotate Y +</ControlButton>
        <ControlButton onClick={() => setRotateY(y => y - 10)}>Rotate Y -</ControlButton>
      </Controls>
      {winner && (
        <>
          <WinMessage>Winner: {winner}</WinMessage>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '48px', color: '#D500F9', animation: 'fadeIn 2s ease-in-out infinite' }}>
            <StarIcon width={48} />
          </div>
        </>
      )}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </GameContainer>
  );
}

export default PlayWithAI;