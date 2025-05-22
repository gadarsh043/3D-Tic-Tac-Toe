import { useState } from 'react';
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
  padding-bottom: 20px; /* Added padding to ensure space at the bottom */
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

const BoardContainer = styled.div`
  perspective: 2000px;
  margin-top: 190px;
  width: 60vmin; /* Adjusted to match HoloProjector */
  height: 60vmin;
  position: relative; /* Ensure it participates in the flex flow */
  flex-shrink: 0; /* Prevent it from shrinking in the flex container */
`;

const HoloProjector = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: projectorFloat 5s infinite ease-in-out;
  @keyframes projectorFloat {
    0%, 100% { transform: translateY(0) translateZ(0); }
    50% { transform: translateY(-15px) translateZ(20px); }
  }
`;

const Board = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(57deg) rotateY(1deg);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;
`;

const Layer = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 5px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid #00D4FF;
  border-radius: 10px;
  transform-style: preserve-3d;
  transition: all 0.5s;
  opacity: ${props => 1 - (props.layerIndex * 0.1)};
  transform: ${props => `translateZ(${props.zOffset}px)`};
  &:hover {
    box-shadow: 0 0 20px #00D4FF;
    opacity: 1;
  }
`;

const Cell = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.isWinning ? 'rgba(213, 0, 249, 0.5)' : 'rgba(20, 20, 50, 0.8)'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  border: 1px solid #00D4FF;
  border-radius: 5px;
  transition: all 0.3s;
  transform-style: preserve-3d;
  &:hover {
    background: rgba(0, 212, 255, 0.2);
    transform: translateZ(8px);
    box-shadow: 0 0 12px rgba(0, 212, 255, 0.7);
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
    <GameContainer>
      <Navbar>
        <NavButton to="/"><ArrowLeftIcon width={20} /> Back</NavButton>
        <Heading>2 Player Mode</Heading>
        <div>
          <RulesButton onClick={() => setShowRules(true)}>Rules & Tips</RulesButton>
          <ResetButton onClick={resetGame}>Reset</ResetButton>
        </div>
      </Navbar>
      <PlayerDisplay>Current Player: {currentPlayer}</PlayerDisplay>
      <Controls>
        <ControlButton onClick={() => setRotateX(x => x + 10)}>Rotate X +</ControlButton>
        <ControlButton onClick={() => setRotateX(x => x - 10)}>Rotate X -</ControlButton>
        <ControlButton onClick={() => setRotateY(y => y + 10)}>Rotate Y +</ControlButton>
        <ControlButton onClick={() => setRotateY(y => y - 10)}>Rotate Y -</ControlButton>
      </Controls>
      <BoardContainer>
        <HoloProjector>
          <Board
            style={{
              transform: `rotateX(${rotateX + 57}deg) rotateY(${rotateY + 1}deg)`
            }}
          >
            {board.map((layer, l) => (
              <Layer key={l} layerIndex={l} zOffset={(2 - l) * 150}>
                {layer.map((row, r) =>
                  row.map((cell, c) => (
                    <Cell
                      key={`${l}-${r}-${c}`}
                      onClick={() => handleClick(l, r, c)}
                      isWinning={isWinningCell(l, r, c)}
                    >
                      {cell}
                    </Cell>
                  ))
                )}
              </Layer>
            ))}
          </Board>
        </HoloProjector>
      </BoardContainer>
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

export default TwoPlayer;