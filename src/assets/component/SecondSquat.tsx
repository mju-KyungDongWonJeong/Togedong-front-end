import styled from 'styled-components';

const SecondPushUp = () => {
  return (
    <Container>
      <CameraGuideContainer>
        <FirstCameraGuide></FirstCameraGuide>
        <CrossShape />
      </CameraGuideContainer>
      <Text>반드시 전신이 카메라에 비치도록 해주세요.</Text>
    </Container>
  );
};

export default SecondPushUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CameraGuideContainer = styled.div`
  width: 700px;
  height: 350px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 20px;
`;

const FirstCameraGuide = styled.div`
  width: 300px;
  height: 350px;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
`;

const CrossShape = styled.div`
  width: 300px;
  height: 350px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.BLACK};
    transform: rotate(45deg);
    top: calc(50% - 1px);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;
