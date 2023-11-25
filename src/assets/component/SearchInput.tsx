import styled from 'styled-components';

interface InputProps {
  placeholder: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
}

const SearchInput = ({
  onSubmit,
  placeholder,
  setSearch,
  search,
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <InputContainer onSubmit={onSubmit}>
      <InputContent
        placeholder={placeholder}
        value={search}
        onChange={handleChange}
      />
    </InputContainer>
  );
};

export default SearchInput;

const InputContainer = styled.form`
  width: 300px;
  height: 35px;
`;

const InputContent = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
  padding: 10px;
`;
