import styled from 'styled-components';

interface RecordData {
  rank: number;
  name: string;
  count: number;
}

const RecordBox = ({ data }: { data: RecordData }) => {
  const { rank, name, count } = data;
  return (
    <Record>
      <Content>{rank}위</Content>
      <Content>{name}</Content>
      <Content>{count}개</Content>
    </Record>
  );
};

export default RecordBox;

const Content = styled.p``;

const Record = styled.div`
  display: flex;
  width: 280px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.WHITE};
  padding: 0 20px;
`;
