import styled from 'styled-components';
import DashboardBox from '../component/DashboardBox';
import badge from '../images/badge.svg';
import record from '../images/record.svg';
import SmallButton from '../component/SmallButton';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetDashboard } from '../../api/GetDashboard';
import { DashboardError, DashboardResponse } from '../type/GetDashboardPayload';
import { GetRank } from '../../api/GetRank';
import { GetRankError, GetRankPayload } from '../type/GetRankPayload';
import { GetChallenge } from '../../api/GetChallenge';
import {
  ChallengeError,
  GetChallengeResponse,
} from '../type/GetChallengePayload';
import ChallengeList from '../component/ChallengeList';

const Dashboard = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [dashboardRes, setDashboardRes] = useState<DashboardResponse>();
  const [rankRes, setRankRes] = useState<GetRankPayload>();
  const [contentView, setContentView] = useState('challenge');
  const [rankExercise, setRankExercise] = useState<'PUSH_UP' | 'SQUAT'>(
    'PUSH_UP',
  );
  const [challengeData, setChallengeData] = useState<GetChallengeResponse>();

  useEffect(() => {
    GetDashboard({ userName, handleDashboardData, handleDashboardError });
  }, [userName]);

  useEffect(() => {
    GetChallenge({ userName, handleChallengeData, handleBoardError });
  }, [userName]);

  const handleDashboardData = (data: DashboardResponse) => {
    setDashboardRes(data);
  };
  const handleDashboardError = (error: DashboardError) => {
    alert(error.cause);
    navigate(`/dashboard/${localStorage.getItem('userName')}`);
  };

  const handleRankExercise = (exerciseName: 'PUSH_UP' | 'SQUAT') => {
    GetRank({ exerciseName, handleRankData, handleBoardError });
  };

  const handleRankData = (data: GetRankPayload) => {
    setRankRes(data);
  };

  const handleBoardError = (error: GetRankError | ChallengeError) => {
    alert(error.cause);
  };

  const handleChallengeData = (data: GetChallengeResponse) => {
    setChallengeData(data);
  };

  return (
    <>
      {dashboardRes && (
        <DashboardContainer>
          <DashboardHeader>
            <HeaderContent>{userName}님 환영해요!</HeaderContent>
          </DashboardHeader>
          <DashboardLayout>
            <DashboardBoxContainer>
              <DashboardBox
                title="보유 뱃지"
                img={badge}
                content={`${dashboardRes.badgeResponse.badgeCount}개`}
                desc={`${dashboardRes.badgeResponse.badgePercent}% 달성`}
              />

              {dashboardRes.bestRecords.map((item, index) => (
                <DashboardBox
                  key={index}
                  title="최고 기록"
                  img={record}
                  content={`${item.record}개`}
                  desc={item.exerciseName}
                />
              ))}
            </DashboardBoxContainer>

            <ButtonContainer>
              <SmallButton
                text="첼린지"
                onClick={() => setContentView('challenge')}
              />
              <SmallButton
                text="랭킹"
                onClick={() => {
                  setContentView('rank');
                  GetRank({
                    exerciseName: rankExercise,
                    handleRankData,
                    handleBoardError,
                  });
                }}
              />
            </ButtonContainer>
            {contentView === 'challenge' && challengeData?.challenges && (
              <ChallengeList
                userName={userName}
                title="첼린지"
                count="참여자 수"
                status="달성현황"
                listData={challengeData.challenges}
                isMine={challengeData.isMine}
                setChallengeData={setChallengeData}
              />
            )}
            {contentView === 'rank' && (
              <ContentContainer>
                <SelectBox>
                  <SelectExercise
                    state={rankExercise === 'PUSH_UP'}
                    onClick={() => {
                      setRankExercise('PUSH_UP');
                      handleRankExercise('PUSH_UP');
                    }}
                  >
                    푸쉬업
                  </SelectExercise>
                  <SelectExercise
                    state={rankExercise === 'SQUAT'}
                    onClick={() => {
                      setRankExercise('SQUAT');
                      handleRankExercise('SQUAT');
                    }}
                  >
                    스쿼트
                  </SelectExercise>
                </SelectBox>
                <ContentHeader>
                  <Rank>등수</Rank>
                  <RankName>닉네임</RankName>
                  <RankCount>개수</RankCount>
                </ContentHeader>
                {rankRes &&
                  rankRes.data.map((item, index) => (
                    <ContentBox key={index}>
                      <Rank>{index + 1}</Rank>
                      <RankName>{item.name}</RankName>
                      <RankCount>{item.count}</RankCount>
                    </ContentBox>
                  ))}
              </ContentContainer>
            )}
          </DashboardLayout>
        </DashboardContainer>
      )}
    </>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const DashboardHeader = styled.div`
  width: 100%;
  height: 270px;
  padding: 90px 65px;
  background-color: ${({ theme }) => theme.colors.ORANGE1};
`;
const DashboardLayout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: 0 65px;
  background-color: #f3f5f9;
`;

const HeaderContent = styled.div`
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 40px;
  max-width: 1165px;
`;

const DashboardBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -70px;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 30px;
  gap: 20px;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 20px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY3};
  color: ${({ theme }) => theme.colors.GRAY3};
  font-size: 20px;
  font-weight: 500;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 15px;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY3};
  color: ${({ theme }) => theme.colors.GRAY3};
  font-size: 20px;
  font-weight: 500;
  :first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.GRAY3};
  }
`;

const SelectExercise = styled.button<{ state: boolean }>`
  width: 50%;
  height: 100%;

  color: ${(props) =>
    props.state ? props.theme.colors.BLACK : props.theme.colors.GRAY3};
  &:first-child {
    border-radius: 20px 0 0 0;
  }
  &:last-child {
    border-radius: 0 20px 0 0;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.ORANGE1};
    color: ${({ theme }) => theme.colors.WHITE};
  }
`;

const Rank = styled.div`
  width: 250px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RankName = styled.div`
  width: 400px;
  flex-grow: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RankCount = styled.div`
  width: 400px;
  flex-grow: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
