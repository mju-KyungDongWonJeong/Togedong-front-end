import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';

interface FieldValues {
  id: string;
  password: string;
}

interface InputProps {
  src: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  placeholder: string;
  type?: string;
  inputId: 'id' | 'password';
  register: UseFormRegister<FieldValues>;
}

const LoginInput: React.FC<InputProps> = ({
  src,
  placeholder,
  register,
  type,
  inputId,
}) => {
  return (
    <InputContainer>
      <InputImage as={src} />
      <InputContent
        placeholder={placeholder}
        type={type}
        {...register(inputId)}
        id={inputId}
      />
    </InputContainer>
  );
};

export default LoginInput;

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
