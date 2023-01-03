import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faArrowRightFromBracket,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/modules/users';

export default function NavHeader() {
  const state = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nickName = useSelector((state) => state.users.userNickName);

  const reduxLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Navbar expand="lg" className="shadow-sm">
        <Container className="text-center">
          <Navbar.Brand href="/" className="fw-bolder col-4">
            <img src="/images/tripLogLogo.png" style={{ width: '30px' }} alt=''></img>
            TripLog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '70px' }}
              navbarScroll
            >
              <Nav.Link href="/list/seoul/sightseeing" className="ms-4">
                서울
              </Nav.Link>
              <Nav.Link href="/list/busan/sightseeing" className="ms-4">
                부산
              </Nav.Link>
              <Nav.Link href="/list/gangneung/sightseeing" className="ms-4">
                강원
              </Nav.Link>
              <Nav.Link href="/list/gyeongju/sightseeing" className="ms-4">
                경주
              </Nav.Link>
              <Nav.Link href="/list/jeonju/sightseeing" className="ms-4">
                전주
              </Nav.Link>
              <Nav.Link href="/list/jeju/sightseeing" className="ms-4">
                제주
              </Nav.Link>
            </Nav>

            <Nav
              className="d-flex flex-sm-row justify-content-sm-center"
              style={{ fontSize: '20px' }}
            >
              <Nav.Link
                href="/Login"
                variant="outline-success"
                className="fs-5"
                style={{ marginRight: '10px' }}
              >
                {state.isLogin === false ? (
                  <FontAwesomeIcon icon={faUser} />
                ) : null}
              </Nav.Link>

              <Nav.Link
                variant="outline-success"
                className="fs-5"
                style={{ marginRight: '10px' }}
              >
                {state.isLogin === true ? (
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    onClick={() => {
                      reduxLogout();
                    }}
                  />
                ) : null}
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate(`/mypage/${nickName}/plan`);
                }}
                className="d-sm-none d-md-inline-block text-success"
              >
                {state.isLogin === true ? (
                  <FontAwesomeIcon icon={faCircleUser} />
                ) : null}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
