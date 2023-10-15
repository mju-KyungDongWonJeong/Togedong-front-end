import styled from 'styled-components';
import { ReactComponent as Logo } from '../images/logo_white.svg';

const ChallengeApply = () => {
  const handleAgree = () => {};
  const handleDisAgree = () => {};

  return (
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
  );
};

export default ChallengeApply;

const ChallengeContainer = styled.div`
  width: 352px;
  height: 302px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
`;

const ChallengeHeader = styled.div`
  width: 100%;
  height: 75px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 175px;
  font-size: 20px;
  font-weight: 500;
`;

const ChallengeBtnContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const ChallengeBtn = styled.button`
  width: 175px;
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
