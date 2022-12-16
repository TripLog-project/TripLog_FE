import { Container, Card, Badge } from 'react-bootstrap';
import Forminput from './Forminput';
import Btn from './Button';
import { useState } from 'react';

const initialErrData = {
  useremail: '',
  userpw: '',
};

export default function UsersForm() {
  const [errData, setErrData] = useState(initialErrData);

  return (
    <>
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
            inputProps={{
              type: 'text',
              placeholder: '닉네임을 입력해주세요.',
            }}
            errMessage={'존재하는 닉네임입니다.'}
          />
          <Forminput
            id={'useremail'}
            label="아이디"
            inputProps={{
              type: 'text',
              placeholder: '이메일을 입력해주세요.',
            }}
            errData={errData}
            setErrData={setErrData}
          />
          <Forminput
            id={'userpw'}
            label="비밀번호"
            inputProps={{
              type: 'password',
              placeholder: '비밀번호를 입력해주세요.',
            }}
            errData={errData}
            setErrData={setErrData}
          />
          <Btn
            id="submit"
            type="submit"
            text="가입하기"
            textColor="#fff"
            backgroundColor="#333"
            hoverColor="#fff"
            hoverBackgroundColor="#555"
          ></Btn>
        </Card>
      </Container>
    </>
  );
}
