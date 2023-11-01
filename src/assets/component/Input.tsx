import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  imgSrc: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
}

const Input = <T extends FieldValues>({
  imgSrc,
  register,
  placeholder,
  type,
  name,
  required,
}: InputProps<T> & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <InputContainer>
      <InputImage as={imgSrc} />
      <InputContent
        placeholder={placeholder}
        type={type}
        {...register(name, { required })}
        id={name}
      />
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
