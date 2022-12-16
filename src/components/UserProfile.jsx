import { Row, Col, Image } from "react-bootstrap"

export default function UserProfile () {
  return (
    <Row className="mt-3 px-2">
      <div className="d-flex align-items-center justify-content-start">
        <Col className="col-1 mx-4">
          <Image src="/images/imgSample.jpg" roundedCircle style={{width:"50px"}} />
        </Col>
        <Col className="flex-fill"> 
          <p className="text-start fw-bold mt-2 mb-0">유저닉네임</p>
        </Col>
      </div>
    </Row>
  )
}

