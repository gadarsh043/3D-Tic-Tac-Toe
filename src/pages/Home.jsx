import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PlayIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import RulesModal from './Rules';
import { useState } from 'react';

const HomeContainer = styled.div`
  background: linear-gradient(135deg, #0A0A23 0%, #1a1a3d 100%);
  color: #00D4FF;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  overflow: hidden;
`;

const Navbar = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const Heading = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  text-align: center;
  flex: 1;
  margin: 0;
  text-shadow: 0 0 10px #00D4FF;
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
  &:hover {
    background: #D500F9;
    color: #0A0A23;
    box-shadow: 0 0 15px #D500F9;
  }
`;

const Button = styled(Link)`
  width: 140px;
  display: flex;
  justify-content: center;
  background: none;
  border: 2px solid #00D4FF;
  color: #00D4FF;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  align-items: center;
  gap: 5px;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  &:hover {
    background: #00D4FF;
    color: #0A0A23;
    box-shadow: 0 0 15px #00D4FF;
  }
`;

function Home() {
  const [showRules, setShowRules] = useState(false);

  return (
    <HomeContainer>
      <Navbar>
        <div style={{ width: '100px' }}></div>
        <Heading>3D Tic-Tac-Toe</Heading>
        <RulesButton onClick={() => setShowRules(true)}>Rules & Tips</RulesButton>
      </Navbar>
      <Button to="/two-player"><UserGroupIcon width={20} /> 2 Player</Button>
      <Button to="/play-ai"><PlayIcon width={20} /> Play with AI</Button>
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </HomeContainer>
  );
}

export default Home;