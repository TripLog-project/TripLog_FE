import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Card, Badge } from 'react-bootstrap';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Forminput from '../../components/Forminput';
import Btn from '../../components/Button';
import { login } from '../../store/modules/users';

// 카카오톡 로그인 필요 정보, CLIENT_ID 로 REST API 키 사용 필요
const KAKAO_CLIENT_ID = 'f25833457b45f3935443a269e01a48b1';
const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fixEmailValue, setFixEmailValue] = useState('thals0@gmail.com');
  const [fixPwValue, setFixpwValue] = useState('11111111aa');

  const idValueChange = (e) => {
    setFixEmailValue(e.target.value);
  };

  const pwValueChange = (e) => {
    setFixpwValue(e.target.value);
  };

  async function loginUser() {
    async function porfolioLogin() {
      const loginInfo = {
        email: fixEmailValue,
        password: fixPwValue,
      };

      const response = await fetch('http://localhost:4000/user/login ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      if (response.status === 200) {
        const result = await response.json();
        if (result.result) {
          dispatch(login(result));
          navigate('/');
        } else {
          alert('해당 정보를 찾을 수 없습니다');
          navigate('/login');
        }
      } else {
        throw new Error('로그인 실패');
      }
    }
    porfolioLogin();
  }
  return (
    <>
      <Nav />
      <Container style={{ width: '30rem' }} className="m-auto mt-5">
        <Card className="p-5 mb-5">
          <div className="d-flex mb-5">
            <h4>TripLog</h4>
            <a href="/Users" style={{ textDecoration: 'none' }}>
              <Badge
                bg="secondary"
                text="light"
                className="ms-2 p-1 d-inline justify-content-end"
                style={{ fontSize: '.3rem' }}
              >
                아직 회원이 아니라면?
              </Badge>
            </a>
          </div>
          <Forminput
            id="useremail"
            label="아이디"
            // normal로그인히기
            // value={useremail}
            // portfolio로그인하기
            value={fixEmailValue}
            onChange={idValueChange}
            inputProps={{
              type: 'text',
              placeholder: 'test@gmail.com',
            }}
          />
          <Forminput
            id="userpw"
            label="비밀번호"
            // normal로그인하기
            // value={userpw}
            // portfolio로그인하기
            value={fixPwValue}
            onChange={pwValueChange}
            inputProps={{
              type: 'password',
              placeholder: '영문, 숫자 포함 8글자 이상',
            }}
          />
          <Btn
            // onClick={() => {(checkUser())}}
            onClick={() => {
              loginUser();
            }}
            text="로그인"
            textColor="#fff"
            backgroundColor="#333"
            hoverColor="#fff"
            hoverBackgroundColor="#555"
          ></Btn>
          <Btn
            href={KAKAO_AUTH_URL}
            text="카카오로그인"
            textColor="#333"
            backgroundColor="#ffd503"
            hoverColor="#333"
            hoverBackgroundColor="#d0ad00"
          ></Btn>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
