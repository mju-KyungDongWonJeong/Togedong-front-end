import styled from 'styled-components';

interface SmallButtonInterface {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SmallButton = ({ text, onClick }: SmallButtonInterface) => {
  return (
    <Button text={text} onClick={onClick} type="button">
      {text}
    </Button>
  );
};

export default SmallButton;

const Button = styled.button<{ text: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) =>
    props.text.length > 5 ? '94px' : props.text.length > 4 ? '127px' : '93px'};
  height: ${(props) =>
    props.text.length > 5 ? '38px' : props.text.length > 4 ? '55px' : '38px'};
  border-radius: 15px;
  font-size: ${(props) => (props.text.length == 5 ? '20px' : '13px')};
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: ${({ theme }) => theme.colors.ORANGE1};
`;
