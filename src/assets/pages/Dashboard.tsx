import styled from 'styled-components';
import DashboardBox from '../component/DashboardBox';
import badge from '../images/badge.svg';
import record from '../images/record.svg';
import SmallButton from '../component/SmallButton';
import { useState } from 'react';

const Dashboard = () => {
  const [contentView, setContentView] = useState({
    rank: false,
    challenge: true,
  });
  const [rankExercise, setRankExercise] = useState({
    pushup: true,
    squat: false,
  });

  const [status, setStatus] = useState(false);

  const dashboardBox = [
    {
      title: '보유 뱃지',
      img: badge,
      content: '5개',
      desc: '35%달성',
    },
    {
      title: '최고기록',
      img: record,
      content: '26개',
      desc: '스쿼트',
    },
    {
      title: '최고기록',
      img: record,
      content: '26개',
      desc: '푸쉬업',
    },
  ];

  const RANKDATA = [
    {
      rank: '1등',
      name: '김정호',
      count: '75개',
    },
    {
      rank: '2등',
      name: '전석민',
      count: '25개',
    },
    {
      rank: '3등',
      name: '난돌민',
      count: '1개',
    },
  ];

  const handleParticipate = () => {
    setStatus(true);
  };

  const handleExercise = () => {};

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderContent>김정호님 환영해요!</HeaderContent>
      </DashboardHeader>
      <DashboardLayout>
        <DashboardBoxContainer>
          {dashboardBox.map((item, index) => (
            <DashboardBox
              title={item.title}
              img={item.img}
              content={item.content}
              desc={item.desc}
              key={index}
            />
          ))}
        </DashboardBoxContainer>
        <ButtonContainer>
          <SmallButton
            text="첼린지"
            onClick={() => setContentView({ rank: false, challenge: true })}
          />
          <SmallButton
            text="랭킹"
            onClick={() => setContentView({ rank: true, challenge: false })}
          />
        </ButtonContainer>
        {contentView.challenge && (
          <ContentContainer>
            <ContentHeader>
              <ChallengeTitle>첼린지</ChallengeTitle>
              <ChallengeCount>참여자 수</ChallengeCount>
              <ChallengeStatus>달성현황</ChallengeStatus>
            </ContentHeader>
            <ContentBox>
              <ChallengeTitle>팔굽 10일동안 100개씩</ChallengeTitle>
              <ChallengeCount>124</ChallengeCount>
              <ChallengeStatus>15%</ChallengeStatus>
              {status ? (
                <ParticipateText>참여중</ParticipateText>
              ) : (
                <SmallButton text="참여하기" onClick={handleParticipate} />
              )}
            </ContentBox>
          </ContentContainer>
        )}
        {contentView.rank && (
          <ContentContainer>
            <SelectBox>
              <SelectExercise
                state={rankExercise.pushup}
                onClick={() => {
                  setRankExercise({ pushup: true, squat: false });
                }}
              >
                푸쉬업
              </SelectExercise>
              <SelectExercise
                state={rankExercise.squat}
                onClick={() => {
                  setRankExercise({ pushup: false, squat: true });
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
            {RANKDATA.map((item, index) => (
              <ContentBox key={index}>
                <Rank>{item.rank}</Rank>
                <RankName>{item.name}</RankName>
                <RankCount>{item.count}</RankCount>
              </ContentBox>
            ))}
          </ContentContainer>
        )}
      </DashboardLayout>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
`;

const DashboardBoxContainer = styled.div`
  display: flex;
  gap: 150px;
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

const ChallengeTitle = styled.div`
  width: 350px;
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

const ChallengeStatus = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
`;

const ContentBox = styled.div`
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RankName = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RankCount = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
