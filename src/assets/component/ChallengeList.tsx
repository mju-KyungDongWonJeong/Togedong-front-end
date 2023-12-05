import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { sidebarState } from '../store/atoms/Sidebar/state';
import { Challenge, GetChallengeResponse } from '../type/GetChallengePayload';
import ChallengeListItem from './ChallengeListItem';

interface ListProps {
  title: string;
  count: string;
  status: string;
  listData: Challenge[];
  isMine?: boolean;
  userName?: string;
  setChallengeData: React.Dispatch<
    React.SetStateAction<GetChallengeResponse | undefined>
  >;
}

const ChallengeList = ({
  userName,
  title,
  count,
  status,
  listData,
  isMine,
  setChallengeData,
}: ListProps) => {
  const navbar = useRecoilValue(sidebarState);

  return (
    <ChallengeListContainer>
      <ChallengeListHeader>
        <ChallengeListTitle navbar={navbar}>{title}</ChallengeListTitle>
        <ChallengeCount>{count}</ChallengeCount>
        <AchieveStatus>{status}</AchieveStatus>
      </ChallengeListHeader>
      {listData.map((item, index) => (
        <ChallengeListItem
          userName={userName}
          challengeName={item.challengeId}
          key={index}
          rowData={item}
          isMine={isMine}
          setChallengeData={setChallengeData}
        />
      ))}
    </ChallengeListContainer>
  );
};

export default ChallengeList;

const ChallengeListContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 20px;
`;

const ChallengeListHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY3};
  color: ${({ theme }) => theme.colors.GRAY3};
  font-size: 20px;
  font-weight: 500;
`;

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
