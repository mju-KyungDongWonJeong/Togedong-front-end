import * as yup from 'yup';
export const validation = yup.object().shape({
  userId: yup
    .string()
    .required('아이디를 다시입력해주세요')
    .matches(/^(?=.*[a-zA-Z0-9]).{2,10}$/, '아이디를 다시입력해주세요'),
  password: yup
    .string()
    .required('비밀번호를 다시입력해주세요')
    .matches(/^(?=.*[a-zA-Z0-9]).{4,16}$/, '비밀번호를 다시입력해주세요'),
});
