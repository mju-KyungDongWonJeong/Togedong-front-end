import styled from 'styled-components';
import SmallButton from './SmallButton';
import { useRecoilValue } from 'recoil';
import { sidebarState } from '../store/atoms/Sidebar/state';
import { useState } from 'react';
import { Challenge, GetChallengeResponse } from '../type/GetChallengePayload';
import ChallengeApply from '../modal/ChallengeApply';
import { PostChallenge } from '../../api/PostChallenge';

interface ListItemProps {
  userName?: string;
  challengeName: 'pushUp ' | 'squat';
  isMine?: boolean;
  rowData: Challenge;
  setChallengeData: React.Dispatch<
    React.SetStateAction<GetChallengeResponse | undefined>
  >;
}

const ChallengeListItem = ({
  challengeName,
  userName,
  rowData,
  isMine,
  setChallengeData,
}: ListItemProps) => {
  const navbar = useRecoilValue(sidebarState);
  const [challengeModal, setChallengeModal] = useState(false);
  const toggleButton = () => {
    setChallengeModal((prev) => !prev);
  };

  return (
    <>
      {challengeModal && (
        <ChallengeApply
          userName={userName}
          challengeName={challengeName}
          setChallengeModal={setChallengeModal}
          challengeApply={PostChallenge}
          setChallengeData={setChallengeData}
        />
      )}
      <ChallengeListBox>
        <ChallengeListTitle navbar={navbar}>
          {rowData.description}
        </ChallengeListTitle>
        <ChallengeCount>{rowData.participantCount}명</ChallengeCount>
        <AchieveStatus>{rowData.progressPercent}%</AchieveStatus>
        {isMine && (
          <>
            {rowData.isParticipating === 'PARTICIPANT' ? (
              <ParticipateText>참여중</ParticipateText>
            ) : (
              <SmallButton text={'참여하기'} onClick={toggleButton} />
            )}
          </>
        )}
      </ChallengeListBox>
    </>
  );
};

export default ChallengeListItem;

const ChallengeListTitle = styled.div<{ navbar: boolean }>`
  width: ${(props) => (props.navbar ? '350px' : '500px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChallengeCount = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AchieveStatus = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
`;

const ChallengeListBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 15px;
`;

const ParticipateText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 94px;
`;
