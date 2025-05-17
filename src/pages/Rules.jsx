import styled from 'styled-components';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const RulesContainer = styled.div`
  background-color: #212121;
  color: #26A69A;
  height: 97vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const BackButton = styled(Link)`
  color: #26A69A;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin: 20px 0;
`;

function Rules() {
  return (
    <RulesContainer>
      <BackButton to="/"><ArrowLeftIcon width={20} /> Back</BackButton>
      <h1>Rules & Tips</h1>
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
    </RulesContainer>
  );
}

export default Rules;