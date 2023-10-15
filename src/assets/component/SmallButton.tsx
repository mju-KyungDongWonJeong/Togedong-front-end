import styled from 'styled-components';

/**
 * 사용하실 때 <SmallButton text="챌린지" /> 형식으로 사용하시면 됩니다.
 */

interface SmallButtonInterface {
  text: string;
}

const SmallButton: React.FC<SmallButtonInterface> = ({ text }) => {
  return <Button>{text}</Button>;
};

export default SmallButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99px;
  height: 40px;
  border-radius: 20px;
  font-size: 15px;
  background-color: ${({ theme }) => theme.colors.ORANGE1};
`;
