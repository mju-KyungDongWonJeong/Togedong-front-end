import styled from 'styled-components';

const FirstPushUp = () => {
  return (
    <Container>
      <CameraGuide></CameraGuide>
      <Text>반드시 카메라가 측면을 바라보도록 해주세요.</Text>
    </Container>
  );
};

export default FirstPushUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CameraGuide = styled.div`
  width: 700px;
  height: 350px;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 20px;
`;
