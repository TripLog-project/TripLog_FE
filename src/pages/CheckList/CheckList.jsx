import {
  Container,
  Accordion,
  Button,
  Row,
  InputGroup,
  Form,
  Col,
} from 'react-bootstrap';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaTrash } from 'react-icons/fa';
// 리듀서
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function CheckList() {
  const nickName = useSelector((state) => state.users.userNickName);

  const [checked, setChecked] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [update, setUpdate] = useState(false);
  const [okay, setOkay] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    axios
    .post('http://localhost:4000/checklist', { nickName })
    .then((res) => {
      setChecklist(res.data);
      setChecked(res.data.checked);
      setOkay(true);
    })
    .catch(() => new Error('통신이상'));
  }, [nickName, update])

  const handleToggle = (b) => () => {
    const currentIndex = checked.indexOf(b);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(b);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // 아이템 추가 input
  const changeHandler = (e) => {
    setText(e.target.value);
  };

  // 체크박스 상태 저장
  const saveCheckList = () => {
    axios
      .post('http://localhost:4000/checklist/checked', {
        nickName: nickName,
        checked: checked,
      })
      .then(() => {
        alert('체크박스 상태를 저장했습니다 ✅');
      })
      .catch(() => new Error('통신이상'));
  };

  if (okay) {
    return (
      <>
        <Nav />
        <Container className="m-auto mt-5 col-lg-8">
          <h1 className="fw-bold lh-base mt-5 mb-5">
            <span style={{ color: '#198754' }}>{nickName}</span>님, 여행 준비
            <br></br>
            체크리스트{' '}
            <img
              src="/images/icons/check.png"
              alt="체크리스트"
              style={{ width: '2.5rem' }}
            />
          </h1>
          <AccordionCustom>
            <Accordion
              defaultActiveKey={[0]}
              alwaysOpen
              className="container col-lg-6"
            >
              {checklist.items.map(function (a, i) {
                return (
                  <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>
                      {checklist.items[i].title}
                    </Accordion.Header>
                    <Accordion.Body className="text-start">
                      <Form>
                        {checklist.items[i].content.map(function (b, j) {
                          return (
                            <Form.Check type="checkbox" key={j}>
                              <Form.Check.Input
                                type="checkbox"
                                onChange={handleToggle(b)}
                                checked={checked.indexOf(b) !== -1}
                              />
                              <Form.Check.Label className="col-10">
                                {checklist.items[i].content[j]}
                              </Form.Check.Label>
                              <FaTrash
                                className="col-2"
                                style={{ color: 'grey' }}
                                onClick={() => {
                                  axios
                                    .delete(
                                      'http://localhost:4000/checklist/deleteItem',
                                      {
                                        data: {
                                          nickName: nickName,
                                          title: checklist.items[i].title,
                                          item: checklist.items[i].content[j],
                                        },
                                      }
                                    )
                                    .then(() => {
                                      setUpdate(!update);
                                    })
                                    .catch(() => new Error('통신이상'));
                                }}
                              />
                            </Form.Check>
                          );
                        })}
                        <InputGroup className="mt-3">
                          <Form.Control
                            type={'text'}
                            placeholder="아이템 추가하기🤗"
                            onChange={(e) => changeHandler(e)}
                          />
                          <Button
                            variant="success"
                            id="button-addon2"
                            onClick={() => {
                              axios
                                .post(
                                  'http://localhost:4000/checklist/addItem',
                                  {
                                    nickName: nickName,
                                    title: checklist.items[i].title,
                                    item: text,
                                  }
                                )
                                .then(() => {
                                  setText('');
                                  setUpdate(!update);
                                })
                                .catch((err) => new Error('통신이상'));
                            }}
                          >
                            추가
                          </Button>
                        </InputGroup>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
              <Row className="mt-3 mx-1">
                <Col>
                  <h6 className="text-start">
                    체크리스트 저장
                    <FaArrowRight style={{ color: '#198754' }} />
                  </h6>
                </Col>
                <Col className="text-end">
                  <Button variant="success" onClick={saveCheckList}>
                    저장
                  </Button>
                </Col>
              </Row>
            </Accordion>
          </AccordionCustom>
        </Container>
        <Footer />
      </>
    );
  }
}

const AccordionCustom = styled.div`
  .accordion-button:not(.collapsed) {
    color: #ffffff;
    background-color: #198754;
    box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
  }
  .accordion-button:focus,
  .accordion-button:active {
    outline: none !important;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
  }
  input[type='checkbox']:checked {
    background: #198754;
    border-color: #198754;
  }
`;
