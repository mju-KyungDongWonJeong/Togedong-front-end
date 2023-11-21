import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { sidebarState } from '../store/atoms/Sidebar/state';
import ListItem from './ListItem';

interface ListProps {
  title: string;
  secondTitle: string;
  thridTitle: string;
  listData: ListData[];
  buttonType: 'toggle' | 'navigate';
  selectExercise?: string;
}

export interface ListData {
  id: number;
  firstContent: string;
  secondContent: string;
  thirdContent: string;
  status?: boolean;
  exercise?: string;
}

const List = ({
  title,
  secondTitle,
  thridTitle,
  listData,
  buttonType,
  selectExercise,
}: ListProps) => {
  const navbar = useRecoilValue(sidebarState);

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle navbar={navbar}>{title}</ListTitle>
        <ListSecondTitle>{secondTitle}</ListSecondTitle>
        <ListThirdTitle>{thridTitle}</ListThirdTitle>
      </ListHeader>
      {listData.map(
        (item) =>
          selectExercise === item.exercise && (
            <ListItem key={item.id} rowData={item} buttonType={buttonType} />
          ),
      )}
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 20px;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY3};
  color: ${({ theme }) => theme.colors.GRAY3};
  font-size: 20px;
  font-weight: 500;
`;

const ListTitle = styled.div<{ navbar: boolean }>`
  width: ${(props) => (props.navbar ? '350px' : '500px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListSecondTitle = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListThirdTitle = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
`;
