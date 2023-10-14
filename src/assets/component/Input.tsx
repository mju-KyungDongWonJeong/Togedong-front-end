import styled from 'styled-components';

interface InputProps {
  src: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  placeholder: string;
  type?: string;
  inputId?: string;
}

const Input: React.FC<InputProps> = ({ src, placeholder, type, inputId }) => {
  return (
    <InputContainer>
      <InputImage as={src} />
      <InputContent
        placeholder={placeholder}
        type={type}
        // {...register(inputId)}
        id={inputId}
      ></InputContent>
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  width: 400px;
  height: 50px;
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.ORANGE1};
`;

const InputImage = styled.img`
  margin-right: 10px;
`;

const InputContent = styled.input`
  border: none;
  font-size: 16px;
  width: 100%;
  height: 100%;
`;
