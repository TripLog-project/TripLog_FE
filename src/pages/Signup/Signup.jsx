import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Badge } from 'react-bootstrap';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Forminput from '../../components/Forminput';
import Btn from '../../components/Button';

const ERROR_MSG = {
  required: '필수 정보입니다.',
  invalidUserEmail: '@ 를 사용하세요',
  invalidUserPW: '8자 이상 영문, 숫자를 사용하세요.',
};

export default function Users() {
  const [nickname, setNickname] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userpw, setUserpw] = useState('');
  const [errorMsg] = useState(ERROR_MSG);
  const navigate = useNavigate();

  const register = () => {
    // 회원 가입 정보를 백엔드로 보내기 전에 각각 입력이 제대로 들어왔는지 여부를 체크하고 해당 값이 정확히 입력 되어야만 전송
    if (UserNicknameValid && UserEmailValid && UserPwValid) {
      axios
        .post('http://localhost:4000/user/register', {
          type: 'local',
          nickName: nickname,
          email: useremail,
          password: userpw,
        })
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          new Error('통신에러')
        });
    } else {
      // 입력 값 중 하나라도 validation 을 통과하지 못하면 alert 창 출력
      alert('회원 가입 정보를 정확히 입력해 주세요!');
    }
  };

  // 닉 네임도 1글자 이상이라는 조건이 필요하므로 해당 조건을 저장할 state 설정
  const [UserNicknameValid, setUserNicknameValid] = useState(false);
  const [UserEmailValid, setUserEmailValid] = useState(false);
  const [UserPwValid, setUserPwValid] = useState(false);

  // 닉 네임의 입력 값에 따라 validation 을 수행하는 함수 생성
  const handleNickName = (e) => {
    setNickname(e.target.value);
    // 한 글자 이상이면 통과 시켜주는 3항 연산자
    e.target.value.length > 0
      ? setUserNicknameValid(true)
      : setUserNicknameValid(false);
  };

  const handleEmail = (e) => {
    setUseremail(e.target.value);
    const USEREMAIL_REGEX =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(.[0-9a-zA-Z_-]+){1,2}$/;
    if (USEREMAIL_REGEX.test(useremail)) {
      setUserEmailValid(true);
    } else {
      setUserEmailValid(false);
    }
  };

  const handlePw = (e) => {
    setUserpw(e.target.value);
    const USERPW_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    if (USERPW_REGEX.test(userpw)) {
      setUserPwValid(true);
    } else {
      setUserPwValid(false);
    }
  };

  return (
    <>
      <Nav />
      <Container style={{ width: '30rem' }} className="m-auto mt-5">
        <Card className="p-5 mb-5">
          <div className="d-flex mb-5">
            <h4>회원가입</h4>
            <a href="/Login" style={{ textDecoration: 'none' }}>
              <Badge
                bg="secondary"
                text="light"
                className="ms-2 p-1 d-inline justify-content-end"
                style={{ fontSize: '.3rem' }}
              >
                이미 회원이라면?
              </Badge>
            </a>
          </div>

          <Forminput
            id={'nickname'}
            label="이름(별명)"
            value={nickname}
            // 닉 네임 체크 함수로 변경
            onChange={handleNickName}
            inputProps={{
              type: 'text',
              placeholder: '닉네임을 입력해주세요.',
            }}
            // 닉 네임이 체크 결과 값에 따라 에러 메세지가 출력 되도록 수정
            validText={!UserNicknameValid ? errorMsg.required : null}
          />

          <Forminput
            id={'useremail'}
            label="아이디"
            value={useremail}
            onChange={handleEmail}
            inputProps={{
              type: 'text',
              placeholder: 'test@gmail.com',
            }}
            validText={
              !UserEmailValid && useremail.length > 0
                ? errorMsg.invalidUserEmail
                : null
            }
          />
          <Forminput
            id={'userpw'}
            label="비밀번호"
            value={userpw}
            onChange={handlePw}
            inputProps={{
              type: 'password',
              placeholder: '영문, 숫자 포함 8글자 이상',
            }}
            validText={
              !UserPwValid && userpw.length > 0 ? errorMsg.invalidUserPW : null
            }
          />
          <Btn
            id="submit"
            type="submit"
            onClick={() => {
              register();
            }}
            text="가입하기"
            textColor="#fff"
            backgroundColor="#333"
            hoverColor="#fff"
            hoverBackgroundColor="#555"
          ></Btn>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
