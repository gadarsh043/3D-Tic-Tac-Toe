import { XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import '@/pages/css/Rules.scss';

function RulesModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <XMarkIcon width={24} />
        </button>
        <h1 className="heading">Rules & Tips</h1>
        <div className="section">
          <h2>How to Play</h2>
          <p>3D Tic-Tac-Toe is played on a 3x3x3 grid. Players take turns placing their symbol (X or O) in an empty cell.</p>
          <p>The goal is to get three of your symbols in a row, which can be:</p>
          <ul>
            <li>Horizontal (in a single layer)</li>
            <li>Vertical (in a single layer)</li>
            <li>Across layers (same row and column, different layers)</li>
            <li>Diagonally (within a layer or across layers)</li>
          </ul>
        </div>
        <div className="section">
          <h2>Tips & Tricks</h2>
          <p>- Focus on the center of each layer to control more winning lines.</p>
          <p>- Block your opponent’s potential winning lines while setting up your own.</p>
          <p>- Think in 3D: diagonals across layers are often overlooked!</p>
        </div>
        <div className="section">
          <h2>Winning Conditions</h2>
          <p>A player wins by getting three symbols in a row in any direction: horizontally, vertically, or diagonally, including 3D diagonals across layers.</p>
        </div>
      </div>
    </div>
  );
}

RulesModal.propTypes = {
  onClose: PropTypes.func
};

export default RulesModal;