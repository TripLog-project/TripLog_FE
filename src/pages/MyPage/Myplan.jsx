import {
  Container,
  Tab,
  Row,
  Col,
  Card,
  Stack,
} from 'react-bootstrap';

export default function Myplan() {
  return (
    <>
      <Tab.Pane eventKey="trip">
        <Row className="m-auto">
          <h1
            className="fw-bold lh-base mt-2 mb-4 m-auto"
            style={{ width: '75%' }}
          >
            <span style={{ color: '#198754' }}>{nickName}</span>
            <span>님의</span>
            <br></br>
            <span>여행🛫 일정입니다</span>
          </h1>
          <Row className="d-flex w-75 m-auto">
            {/* 어떤 option이든 data에 값이 들어가기 때문에 조건문 추가/ state 뒤에 ? 없으면 이전 data로 그리려다가 undefined 에러  */}
            {option === 'plans' ? (
              data.length === 0 ? (
                <p>여행 계획이 없습니다</p>
              ) : (
                data[0].state?.planDate.period.map(function (a, i) {
                  return (
                    <Container xl={5} className="my-3 " key={i}>
                      <Card className="m-2">
                        <Row className="d-flex justify-content-center flex-wrap">
                          <Col md={7} className="d-flex text-center">
                            <p
                              className="fw-6 fw-bold w-75 m-auto my-3 text-center bg-success rounded p-2"
                              style={{ color: '#fff' }}
                            >
                              day {i + 1}
                            </p>
                          </Col>
                        </Row>
                        <Row className="m-3">
                          <Stack className="d-flex flex-column my-auto text-center">
                            {data[0].state.planItems[i].map(function (b, j) {
                              return (
                                <div
                                  style={{
                                    backgroundColor: '#fafafa',
                                    padding: '1rem',
                                  }}
                                  key={j}
                                >
                                  <Title className="m-1 fs-6">
                                    {data[0].state.planItems[i][j].title}
                                  </Title>
                                  <Title
                                    className="m-1"
                                    style={{ fontSize: '12px' }}
                                  >
                                    {data[0].state.planItems[i][j].addr1}
                                  </Title>
                                  <div style={{ color: '#1A8754' }}></div>
                                </div>
                              );
                            })}
                          </Stack>
                        </Row>
                      </Card>
                    </Container>
                  );
                })
              )
            ) : (
              <div>계획한 여행이 아직 없습니다</div>
            )}
          </Row>
        </Row>
      </Tab.Pane>
    </>
  );
}
