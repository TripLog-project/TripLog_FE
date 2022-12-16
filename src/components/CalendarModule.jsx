import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { addPlanDate } from '../store/modules/triplog';

//CalendarModule
function CalendarModule() {
  let state = useSelector((state) => state.triplog);
  let dispatch = useDispatch();

  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const [planDate, setPlanDate] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Navigate = useNavigate();
  const params = useParams();
  const areaCode = params.areaCode;

  const getDate = (e) => {
    const dateLength = Math.ceil(
      (value[1].getTime() - value[0].getTime()) / (1000 * 60 * 60 * 24)
    );

    // 날짜 계산의 경우 JS 에서 제공하는 형태로 해야 편리하기 때문에 Java 의 Date 형식에 맞게 계산되는 값이 들어가는 clickDateJava
    let clickDateJava = [];
    // 한국어 문자열로 변환된 clickDate
    let clickDate = [];
    // 시작일을 저장하기 위한 start 변수
    let start = value[0];
    let startJava = value[0];

    // JS Date 형태의 Date 가 필요하면 ClickDateJava 의 데이터를 사용
    for (let i = 0; i < dateLength; i++) {
      if (i === 0) {
        clickDate.push(
          moment(new Date(start.setDate(start.getDate()))).format(
            'YYYY년 MM월 DD일'
          )
        );
      } else {
        clickDate.push(
          moment(new Date(start.setDate(start.getDate() + 1))).format(
            'YYYY년 MM월 DD일'
          )
        );
      }
    }

    // 만들어진 clickDate 또는 clickDateJava 를 바로 axios 로 전달
    // state 를 사용하기 이상하게 처음 선택 완료 클릭 시에, 자꾸 값이 안들어가는 문제가 생겨서 그냥 변수로 처리
    setPlanDate(clickDate);

    dispatch(
      addPlanDate({
        startDate: clickDate[0],
        endDate: clickDate[clickDate.length - 1],
        period: clickDate,
      })
    );

    setShow(false);
    Navigate(`/Plan/${areaCode}`);
  };

  return (
    <>
      <LinkBtn onClick={handleShow}>TripLog 시작하기 📆</LinkBtn>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>TripLog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="text-center">🛫 여행 날짜를 선택해주세요</h4>

            {value.length > 0 ? (
              <p className="text-center">
                {moment(value[0]).format('YYYY년 MM월 DD일')}
                <span className="bold"> ~ </span>{' '}
                {moment(value[1]).format('MM월 DD일')}
              </p>
            ) : (
              <p className="text-center">
                <span className="bold">오늘:</span>{' '}
                {moment(value).format('YYYY년 MM월 DD일')}
              </p>
            )}

            <Calendar
              minDate={new Date()}
              onChange={onChange}
              selectRange={true}
              formatDay={(locale, date) => moment(date).format('DD')} //'일'글씨 빼기
              maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
              className="m-auto"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>

          <Button variant="success" onClick={getDate}>
            선택 완료
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CalendarModule;

const LinkBtn = styled.button`
  background-color: rgb(0, 0, 0, 0.4);
  border: none;
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 10px;
  font-family: ‘ChosunBg’;
  color: #fff;
  margin: 22% 0 0 3%;
  &:hover {
    background-color: #000;
  }
  @media only screen and (max-width: 1200px) {
    font: 0.8rem/1 ‘ChosunBg’;
    margin: 23% 0 0 3%;
  }
  @media only screen and (max-width: 992px) {
    font: 0.5rem/1 ‘ChosunBg’;
    margin: 23% 0 0 3%;
  }
  @media only screen and (max-width: 768px) {
    font: 0.01rem/1 ‘ChosunBg’;
    margin: 17% 0 0 3%;
  }
  @media only screen and (max-width: 576px) {
    margin: 16% 0 0 1%;
  }
`;
