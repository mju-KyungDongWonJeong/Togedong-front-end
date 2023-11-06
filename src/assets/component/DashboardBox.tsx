import styled from 'styled-components';

interface DashboardBoxProps {
  title: string;
  img: string;
  content: string;
  desc: string;
}

const DashboardBox = ({ title, img, content, desc }: DashboardBoxProps) => {
  return (
    <DashboardBoxContainer>
      <DashboardBoxHeader>
        <BoxTitle>{title}</BoxTitle>
        <BoxImg src={img} />
      </DashboardBoxHeader>
      <BoxContent>{content}</BoxContent>
      <BoxDesc>{desc}</BoxDesc>
    </DashboardBoxContainer>
  );
};

export default DashboardBox;

const DashboardBoxContainer = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
`;

const DashboardBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BoxTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const BoxImg = styled.img``;

const BoxContent = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const BoxDesc = styled.div`
  color: ${({ theme }) => theme.colors.GRAY1};
`;
