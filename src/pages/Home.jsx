import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PlayIcon, UserGroupIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

const HomeContainer = styled.div`
  background-color: #212121;
  color: #26A69A;
  height: 97vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Button = styled(Link)`
  width: 140px;
  display: flex;
  justify-content: center;
  background-color: #26A69A;
  color: #212121;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    background-color: #1E7E74;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <h1>3D Tic-Tac-Toe</h1>
      <Button to="/two-player"><UserGroupIcon width={20} /> 2 Player</Button>
      <Button to="/play-ai"><PlayIcon width={20} /> Play with AI</Button>
      <Button to="/rules"><InformationCircleIcon width={20} /> Rules & Tips</Button>
    </HomeContainer>
  );
}

export default Home;