import { Tab, Row, Card } from 'react-bootstrap';

export default function MyReview({ data, nickName }) {
  return (
    <>
      <Tab.Pane eventKey="review">
        <Row className="m-auto">
          <h1
            className="fw-bold lh-base mt-2 mb-4 m-auto"
            style={{ width: '75%' }}
          >
            <span style={{ color: '#198754' }}>{nickName}</span>
            <span>님의</span>
            <br></br>
            <span>리뷰✏️ 입니다</span>
          </h1>
          <Row className="d-flex w-75 m-auto">
            {data.length === 0 ? (
              <div>작성한 리뷰가 없습니다</div>
            ) : (
              data.map((a, i) => {
                return (
                  <>
                    <Row
                      key={i}
                      className="m-auto text-center w-75 shadow-sm"
                      style={{ fontSize: '12px' }}
                    >
                      <Card className="mt-3">
                        <Card.Body>
                          <Card.Title className="mb-3 fs-6 bg-success text-light w-50 p-1 m-5 m-auto rounded">
                            {a.title}
                          </Card.Title>
                          <div className="d-flex">
                            <div className="border rounded w-50">
                              <p className="mb-2 text-muted">{a.dateFull}</p>
                              <Card.Text className="mb-2">
                                ⭐⭐⭐⭐⭐
                                <span> {a.star} </span>
                                ❤👍🏼 조회수 <span>{a.view}</span>
                              </Card.Text>
                            </div>

                            <div className="w-50 ms-2 border rounded">
                              <Card.Text className=" d-flex align-items-center justify-content-center h-100 fs-6">
                                {a.content}
                              </Card.Text>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Row>
                  </>
                );
              })
            )}
          </Row>
        </Row>
      </Tab.Pane>
    </>
  );
}
