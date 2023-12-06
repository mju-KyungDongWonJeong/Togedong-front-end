import styled from 'styled-components';
import Body from '../images/Pose-all.jpg';
import WrongBody from '../images/Pose-wrong.jpg';

const SecondPushUp = () => {
  return (
    <Container>
      <CameraGuideContainer>
        <FirstCameraGuide>
          <Pose src={Body} alt="전신" />
        </FirstCameraGuide>
        <CrossShape>
          <Pose src={WrongBody} alt="잘못된 예시" />
        </CrossShape>
      </CameraGuideContainer>
      <Text>반드시 전신이 카메라에 비치도록 해주세요.</Text>
      <Text>타이머는 5초 뒤에 시작됩니다.</Text>
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
`;

const CrossShape = styled.div`
  width: 300px;
  height: 350px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 5px;
    background: red;
    transform: rotate(45deg);
    top: calc(50% - 1px);
    z-index: 1; // 추가된 부분
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 5px;
    background: red;
    transform: rotate(135deg);
    top: calc(50% - 1px);
    right: 0;
    z-index: 1; // 추가된 부분
  }
`;

const Pose = styled.img`
  width: 300px;
  height: 350px;
`;
