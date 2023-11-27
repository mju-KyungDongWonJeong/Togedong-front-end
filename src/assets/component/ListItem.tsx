import styled from 'styled-components';
import { ListData } from './List';
import SmallButton from './SmallButton';
import { useRecoilValue } from 'recoil';
import { sidebarState } from '../store/atoms/Sidebar/state';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ListItemProps {
  isMine?: boolean;
  rowData: ListData;
  buttonType: 'toggle' | 'navigate';
}

const ListItem = ({ rowData, buttonType, isMine }: ListItemProps) => {
  const navbar = useRecoilValue(sidebarState);
  const navigate = useNavigate();
  const [isParticipated, setIsParticipated] = useState(rowData.status ?? false);
  const toggleButton = () => {
    setIsParticipated((prev) => !prev);
  };
  const handleNavigate = () => navigate('/game');

  return (
    <ListBox key={rowData.id}>
      <ListTitle navbar={navbar}>{rowData.firstContent}</ListTitle>
      <ListSecondTitle>{rowData.secondContent}</ListSecondTitle>
      <ListThirdTitle>{rowData.thirdContent}</ListThirdTitle>
      {isMine && (
        <>
          {isParticipated ? (
            <ParticipateText>참여중</ParticipateText>
          ) : (
            <SmallButton
              text={buttonType === 'toggle' ? '참여하기' : '참가하기'}
              onClick={buttonType === 'toggle' ? toggleButton : handleNavigate}
            />
          )}
        </>
      )}
    </ListBox>
  );
};

export default ListItem;

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

const ListBox = styled.div`
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
