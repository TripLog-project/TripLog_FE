import {
  Tab,
  Row,
  Card,
} from 'react-bootstrap';

export default function MyReview() {
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
            {option === 'review' && data.length === 0 ? (
              <p>작성한 리뷰가 없습니다</p>
            ) : (
              data.map(function (b, j) {
                return (
                  <>
                    <Row
                      key={j}
                      className="m-auto text-center w-75 shadow-sm"
                      style={{ fontSize: '12px' }}
                    >
                      <Card className="mt-3">
                        <Card.Body>
                          <Card.Title
                            className="mb-3 fs-6 bg-success text-light w-50 p-1 m-5 m-auto rounded"
                            key={j}
                          >
                            {data[j].title}
                          </Card.Title>
                          <div className="d-flex">
                            <div className="border rounded w-50">
                              <p className="mb-2 text-muted">
                                {/* {data[j].dateFull.slice(0, 10)} */}
                                {data[j].dateFull}
                              </p>
                              <Card.Text className="mb-2">
                                ⭐⭐⭐⭐⭐
                                <span> {data[j].star} </span>
                                ❤👍🏼 조회수 <span>{data[j].view}</span>
                              </Card.Text>
                            </div>

                            <div className="w-50 ms-2 border rounded">
                              <Card.Text className=" d-flex align-items-center justify-content-center h-100 fs-6">
                                {data[j].content}
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
