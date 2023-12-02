import styled from 'styled-components';
import { ReactComponent as Logo } from '../images/logo_white.svg';
import { PostChallengeProps } from '../../api/PostChallenge';
import { PostChallengePayload } from '../type/PostChallengePayload';
import { ChallengeError } from '../type/GetChallengePayload';

interface ChallengeModalProps {
  userName?: string;
  challengeName: 'pushUp ' | 'squat';
  setChallengeModal: React.Dispatch<React.SetStateAction<boolean>>;
  challengeApply: (props: PostChallengeProps) => Promise<void>;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChallengeApply = ({
  userName,
  challengeName,
  setChallengeModal,
  challengeApply,
  setReRender,
}: ChallengeModalProps) => {
  const handleAgree = () => {
    challengeApply({
      userName,
      challengeName,
      handlePostChallenge,
      handleBoardError,
    });
  };
  const handleDisAgree = () => {
    setChallengeModal(false);
  };

  const handlePostChallenge = (data: PostChallengePayload) => {
    alert(data.message);
    setReRender((prev) => !prev);
    setChallengeModal(false);
  };
  const handleBoardError = (error: ChallengeError) => {
    alert(error.cause);
  };

  return (
    <>
      <BackGround></BackGround>
      <ChallengeContainer>
        <ChallengeHeader>
          <LogoImg as={Logo} />
        </ChallengeHeader>
        <ChallengeContent>첼린지를 참여 하시겠습니까?</ChallengeContent>
        <ChallengeBtnContainer>
          <ChallengeBtn onClick={handleAgree}>예</ChallengeBtn>
          <ChallengeBtn onClick={handleDisAgree}>아니요</ChallengeBtn>
        </ChallengeBtnContainer>
      </ChallengeContainer>
    </>
  );
};

export default ChallengeApply;

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
`;

const ChallengeContainer = styled.div`
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 10px;
`;

const ChallengeHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.ORANGE1};
  border-radius: 10px 10px 0 0;
`;

const LogoImg = styled.img`
  width: 75px;
  height: 100%;
`;

const ChallengeContent = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  background-color: white;
`;

const ChallengeBtnContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const ChallengeBtn = styled.button`
  width: 225px;
  height: 100%;
  font-size: 17px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.ORANGE1};
  &:first-child {
    border-radius: 0 0 0 10px;
    margin-right: 1px;
  }
  &:last-child {
    border-radius: 0 0 10px 0;
  }
`;
