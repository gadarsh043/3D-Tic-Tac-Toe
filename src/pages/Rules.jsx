import styled from 'styled-components';
import { XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #0A0A23 0%, #1a1a3d 100%);
  color: #00D4FF;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #00D4FF;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #D500F9;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #00D4FF;
    transform: scale(1.2);
  }
`;

const Section = styled.div`
  margin: 20px 0;
  font-family: 'Orbitron', sans-serif;
`;

const Heading = styled.h1`
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  text-shadow: 0 0 10px #00D4FF;
`;

function RulesModal({ onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}><XMarkIcon width={24} /></CloseButton>
        <Heading>Rules & Tips</Heading>
        <Section>
          <h2>How to Play</h2>
          <p>3D Tic-Tac-Toe is played on a 3x3x3 grid. Players take turns placing their symbol (X or O) in an empty cell.</p>
          <p>The goal is to get three of your symbols in a row, which can be:</p>
          <ul>
            <li>Horizontal (in a single layer)</li>
            <li>Vertical (in a single layer)</li>
            <li>Across layers (same row and column, different layers)</li>
            <li>Diagonally (within a layer or across layers)</li>
          </ul>
        </Section>
        <Section>
          <h2>Tips & Tricks</h2>
          <p>- Focus on the center of each layer to control more winning lines.</p>
          <p>- Block your opponent’s potential winning lines while setting up your own.</p>
          <p>- Think in 3D: diagonals across layers are often overlooked!</p>
        </Section>
        <Section>
          <h2>Winning Conditions</h2>
          <p>A player wins by getting three symbols in a row in any direction: horizontally, vertically, or diagonally, including 3D diagonals across layers.</p>
        </Section>
      </ModalContent>
    </ModalOverlay>
  );
}

RulesModal.propTypes = {
    onClose: PropTypes.func
};

export default RulesModal;