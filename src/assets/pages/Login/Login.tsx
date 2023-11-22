import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as Logo } from '../../images/logo_white.svg';
import { ReactComponent as User } from '../../images/user.svg';
import { ReactComponent as Lock } from '../../images/lock.svg';
import Input from '../../component/Input';
import LargeButton from '../../component/LargeButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validation } from './Validation';
import { Link, useNavigate } from 'react-router-dom';
import { PostLogin } from '../../../api/\bauth/Login';
import { LoginError, LoginResponse } from '../../type/PostLoginPayload';

export interface LoginInputs {
  userId: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(validation),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    PostLogin({ data, callbackFunction, handleError });
  };

  const callbackFunction = (data: LoginResponse) => {
    alert(data.message);
    localStorage.setItem('accessToken', data.data.accessToken);
    navigate('/dashboard');
  };

  const handleError = (error: LoginError) => {
    if (error.validation) {
      alert(error.validation[0].message);
    } else if (error.status == 409) {
      alert(error.cause);
    }
  };

  return (
    <Background>
      <LoginContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <ContentConatiner>
          <LoginHeader>
            <LoginTitle>로그인</LoginTitle>
            <LoginIntro>저희와 함께 운동해요!</LoginIntro>
          </LoginHeader>
          <InputContainer onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <Input
                imgSrc={User}
                placeholder="아이디를 입력해주세요"
                type="userId"
                register={register}
                required
                name="userId"
              />
              {errors.userId && (
                <LoginErrorContent>{errors.userId.message}</LoginErrorContent>
              )}
            </InputBox>
            <InputBox>
              <Input
                register={register}
                imgSrc={Lock}
                placeholder="비밀번호를 입력해주세요"
                type="password"
                required
                name="password"
              />
              {errors.password && (
                <LoginErrorContent>{errors.password.message}</LoginErrorContent>
              )}
            </InputBox>
            <LinkContainer>
              아직 회원이 아니신가요?
              <LinkSignup to="/signup">회원가입 하기</LinkSignup>
            </LinkContainer>
            <LargeButton text="로그인" />
          </InputContainer>
        </ContentConatiner>
      </LoginContainer>
    </Background>
  );
};

export default Login;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  padding: 50px 220px;
`;

const LoginContainer = styled.div`
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

const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;
const LoginTitle = styled.div`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 10px;
`;
const LoginIntro = styled.div`
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

const LinkContainer = styled.p`
  display: flex;
  width: 100%;
  justify-content: end;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY1};
`;

const LinkSignup = styled(Link)`
  color: ${({ theme }) => theme.colors.ORANGE1};
`;

const LoginErrorContent = styled.div`
  display: flex;
  width: 100%;
  align-items: baseline;
  color: ${({ theme }) => theme.colors.GREEN};
  font-size: 13px;
  font-weight: 500;
  margin-top: 10px;
`;
