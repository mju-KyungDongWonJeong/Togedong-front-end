import styled from 'styled-components';
import { ReactComponent as Cancle } from '../images/cancel.svg';
import Pushup from '../images/PushUpBadge.png';
import Squat from '../images/SquatBadge.png';
import { Badge } from '../type/GetDashboardPayload';

interface BadgeModalProps {
  setBadgeBoard: React.Dispatch<React.SetStateAction<boolean>>;
  badgeState: Badge;
}

const BadgeModal = ({ badgeState, setBadgeBoard }: BadgeModalProps) => {
  return (
    <>
      <BackGround></BackGround>
      <BadgeContainer>
        <BadgeHeader>
          <BadgeTitle>뱃지 현황</BadgeTitle>
          <button onClick={() => setBadgeBoard(false)}>
            <Cancle />
          </button>
        </BadgeHeader>
        <BadgeContent>
          <PushupImg src={Pushup} state={badgeState.PUSH_UP_BADGE} />
          <SquatImg src={Squat} state={badgeState.SQUAT_BADGE} />
        </BadgeContent>
      </BadgeContainer>
    </>
  );
};

export default BadgeModal;

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
`;

const BadgeContainer = styled.div`
  width: 450px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 10px;
  background-color: white;
`;

const BadgeContent = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  background-color: white;
  margin-bottom: 20px;
`;

const BadgeHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
`;

const BadgeTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

const PushupImg = styled.img<{ state: boolean }>`
  width: 150px;
  margin-right: 30px;
  opacity: ${(props) => (props.state ? 1 : 0.5)};
`;

const SquatImg = styled.img<{ state: boolean }>`
  width: 150px;
  opacity: ${(props) => (props.state ? 1 : 0.5)};
`;
