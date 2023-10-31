import styled from 'styled-components';
import FirstPushUp from '../component/FirstPushUp';
import SecondPushUp from '../component/SecondPushUp';
import Cancel from '../images/cancel.svg';
import { useState } from 'react';

const COMPONENT_DATA = [
  {
    id: 1,
    name: 'first',
  },
  {
    id: 2,
    name: 'second',
  },
];

const PushUpGameGuide = () => {
  const [showGuide, setShowGuide] = useState<string>('first');

  const handlePrevGuide = () => {
    setShowGuide('first');
  };

  const handleNextGuide = () => {
    setShowGuide('second');
  };

  const handleExit = () => {
    console.log('exit');
  };

  const selectComponent: { [key: string]: JSX.Element } = {
    first: <FirstPushUp />,
    second: <SecondPushUp />,
  };

  return (
    <Container>
      <TitleContainer>
        <Title>푸쉬업 게임안내</Title>
        {showGuide === 'second' && (
          <ExitButton onClick={handleExit} src={Cancel} alt="X 버튼" />
        )}
      </TitleContainer>
      <CameraContainer>
        {COMPONENT_DATA.map((item) => {
          return showGuide !== 'second' ? (
            <NextButton
              onClick={handleNextGuide}
              name={item.name}
              key={item.id}
            >
              {'>'}
            </NextButton>
          ) : (
            <PrevButton
              onClick={handlePrevGuide}
              name={item.name}
              key={item.id}
            >
              {'<'}
            </PrevButton>
          );
        })}
        {selectComponent[showGuide]}
      </CameraContainer>
    </Container>
  );
};

export default PushUpGameGuide;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 700px;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 800px;
  height: 250px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.p`
  font-size: 90px;
  font-weight: bold;
  margin: 100px 0 80px 0;
`;

const CameraContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 740px;
  height: 350px;
  position: relative;
`;

const NextButton = styled.button`
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.ORANGE2};
  position: absolute;
  left: 650px;
`;

const PrevButton = styled.button`
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.ORANGE2};
  position: absolute;
  right: 650px;
`;

const ExitButton = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50px;
  right: 30px;

  &:hover {
    cursor: pointer;
  }
`;
