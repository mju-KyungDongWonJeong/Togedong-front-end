import styled from 'styled-components';

/**
 * 사용하실 때 <LargeButton text="회원가입" /> 형식으로 사용하시면 됩니다.
 */

interface LargeButtonInterface {
  text: string;
}

const LargeButton: React.FC<LargeButtonInterface> = ({ text }) => {
  return <Button>{text}</Button>;
};

export default LargeButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 176px;
  height: 41px;
  background-color: ${({ theme }) => theme.colors.ORANGE1};
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
`;
