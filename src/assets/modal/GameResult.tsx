import styled from 'styled-components';
import cancel from '../images/cancel.svg';
import RecordBox from '../component/RecordBox';
import { useNavigate } from 'react-router-dom';

interface GameResultProps {
  roomManager: string; // RoomManagerType은 실제로 사용되는 타입으로 대체해야 합니다.
  count: number;
}

const GameResult: React.FC<GameResultProps> = ({ roomManager, count }) => {
  const CONTENT_DATA = [
    {
      rank: 1,
      name: roomManager, // roomManager 값을 활용하여 변경
      count: count, // count 값을 활용하여 변경
    },
  ];
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/gamelist');
  };
  return (
    <Container>
      <TitleBox>
        <Title>결과</Title>
        <XBox src={cancel} alt="x버튼" onClick={handleExit} />
      </TitleBox>
      <ContentBox>
        <ContentTitleBox>
          <ContentTitle>순위</ContentTitle>
          <ContentTitle>이름</ContentTitle>
          <ContentTitle>개수</ContentTitle>
        </ContentTitleBox>
        {CONTENT_DATA.map((item, index) => (
          <RecordBox data={item} key={index} />
        ))}
      </ContentBox>
    </Container>
  );
};

export default GameResult;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.ORANGE1};
  border-radius: 10px;
  align-items: center;
  z-index: 200;
`;

const TitleBox = styled.div`
  margin-top: 20px;
  display: flex;
  height: 60px;
  width: 450px;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const Title = styled.p`
  font-size: 35px;
  font-weight: bold;
  height: 60px;
`;

const XBox = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 30px;
  margin-left: 140px;
  &:hover {
    cursor: pointer;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: 100%;
`;

const ContentTitleBox = styled.div`
  display: flex;
  width: 280px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 0 13px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.WHITE};
`;

const ContentTitle = styled.p`
  font-size: 25px;
  font-weight: bold;
`;
