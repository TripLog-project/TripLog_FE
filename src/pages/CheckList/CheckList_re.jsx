import {
  Container,
  Accordion,
  Button,
  Row,
  InputGroup,
  Form,
  Col,
} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { checkUpdate } from '../../store/modules/check';

export default function CheckListRe({ data }) {
  const checkListData = data[0];
  const [checked, setChecked] = useState(data[0].checked);

  const dispatch = useDispatch();

  const nickName = useSelector((state) => state.users.userNickName);

  const [text, setText] = useState('');

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

  /* 추가 인풋 */
  const changeHandler = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Container className="m-auto mx-5 col-9">
        <AccordionCustom style={{ width: '130%' }}>
          <Accordion defaultActiveKey={0} alwaysOpen className="container mx-3">
            {checkListData.items.map((a, i) => {
              return (
                <>
                  <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>{a.title}</Accordion.Header>
                    <Accordion.Body className="text-start">
                      <Form>
                        {a.content.map((b, j) => {
                          return (
                            <>
                              <Form.Check type="checkbox" key={j}>
                                <Form.Check.Input
                                  type="checkbox"
                                  onChange={handleToggle(b)}
                                  checked={checked.indexOf(b) !== -1}
                                />
                                <Form.Check.Label className="col-10">
                                  {a.content[j]}
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
                                            title: checkListData.items[i].title,
                                            item: checkListData.items[i]
                                              .content[j],
                                          },
                                        }
                                      )
                                      .then(() => {
                                        dispatch(checkUpdate());
                                        alert('삭제되었습니다.');
                                      })
                                      .catch(() => {
                                        new Error('통신에러');
                                      });
                                  }}
                                />
                              </Form.Check>
                            </>
                          );
                        })}
                        <InputGroup className="mt-3">
                          <Form.Control
                            placeholder="아이템 추가하기🤗"
                            onChange={(e) => changeHandler(e)}
                            value={text}
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
                                    title: checkListData.items[i].title,
                                    item: text,
                                  }
                                )
                                .then(() => {
                                  dispatch(checkUpdate());
                                  setText('');
                                  alert('추가되었습니다.');
                                })
                                .catch(() => {
                                  new Error('통신에러');
                                });
                            }}
                          >
                            추가
                          </Button>
                        </InputGroup>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              );
            })}
            <Row className="mt-3 mx-1">
              <Col className="text-end">
                <Button
                  variant="success"
                  onClick={() => {
                    axios
                      .post('http://localhost:4000/checklist/checked', {
                        nickName: nickName,
                        checked: checked,
                      })
                      .then(() => {
                        dispatch(checkUpdate());
                        alert('저장되었습니다.');
                      })
                      .catch(() => new Error('통신에러'));
                  }}
                >
                  저장
                </Button>
              </Col>
            </Row>
          </Accordion>
        </AccordionCustom>
      </Container>
    </>
  );
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
