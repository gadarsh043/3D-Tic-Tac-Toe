import { Link } from 'react-router-dom';
import { PlayIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import RulesModal from './Rules';
import { useState } from 'react';
import '../pages/css/Home.scss';

function Home() {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="home-container">
      <div className="navbar">
        <div style={{ width: '100px' }}></div>
        <h1 className="heading">3D Tic-Tac-Toe</h1>
        <button className="rules-button" onClick={() => setShowRules(true)}>Rules & Tips</button>
      </div>
      <Link to="/two-player" className="button">
        <UserGroupIcon width={20} /> 2 Player
      </Link>
      <Link to="/play-ai" className="button">
        <PlayIcon width={20} /> Play with AI
      </Link>
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
}

export default Home;