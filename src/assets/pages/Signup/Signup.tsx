import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as Logo } from '../../images/logo_white.svg';
import { ReactComponent as Nickname } from '../../images/nickname.svg';
import { ReactComponent as User } from '../../images/user.svg';
import { ReactComponent as Lock } from '../../images/lock.svg';
import Input from '../../component/Input';
import LargeButton from '../../component/LargeButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validation } from './Validation';

type SignupInputs = {
  id: string;
  password: string;
  userName: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    console.log(data);
  };

  return (
    <Background>
      <SignupContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <ContentConatiner>
          <SignupHeader>
            <SignupTitle>회원가입</SignupTitle>
            <SignupIntro>저희의 새로운 회원이 되어주세요!</SignupIntro>
          </SignupHeader>
          <InputContainer onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <Input<SignupInputs>
                register={register}
                imgSrc={Nickname}
                placeholder="닉네임을 입력해주세요"
                type="text"
                name="userName"
                required
              />
              {errors.userName && (
                <SignupError>{errors.userName.message}</SignupError>
              )}
            </InputBox>
            <InputBox>
              <Input
                imgSrc={User}
                placeholder="아이디를 입력해주세요"
                type="id"
                register={register}
                name="id"
                required
              />
              {errors.id && <SignupError>{errors.id.message}</SignupError>}
            </InputBox>
            <InputBox>
              <Input
                register={register}
                imgSrc={Lock}
                placeholder="비밀번호를 입력해주세요"
                type="password"
                name="password"
                required
              />
              {errors.password && (
                <SignupError>{errors.password.message}</SignupError>
              )}
            </InputBox>
            <LargeButton text="회원가입" />
          </InputContainer>
        </ContentConatiner>
      </SignupContainer>
    </Background>
  );
};

export default Signup;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  padding: 50px 220px;
`;

const SignupContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.05);
  display: flex;
`;
const LogoContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  border-radius: 20px 0 0 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 122, 0, 0.62) 58.25%,
    rgba(255, 138, 29, 0.57) 73.67%,
    rgba(255, 186, 122, 0.43) 122.2%
  );
`;

const ContentConatiner = styled.div`
  height: 100%;
  padding: 70px 95px;
`;

const SignupHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;
const SignupTitle = styled.div`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 10px;
`;
const SignupIntro = styled.div`
  color: ${({ theme }) => theme.colors.GRAY1};
  font-size: 15px;
  font-weight: 500;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > button {
    margin-top: 30px;
  }
`;

const InputBox = styled.div`
  margin-bottom: 20px;
`;
const SignupError = styled.div`
  display: flex;
  width: 100%;
  align-items: baseline;
  color: ${({ theme }) => theme.colors.GREEN};
  font-size: 13px;
  font-weight: 500;
  margin-top: 10px;
`;
