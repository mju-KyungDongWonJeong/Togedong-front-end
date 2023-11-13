import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchInput = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const handleSubmit = () => {
    navigate(`/dashboard/${search}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <InputContainer onSubmit={handleSubmit}>
      <InputContent
        placeholder="친구를 검색하세요!"
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
