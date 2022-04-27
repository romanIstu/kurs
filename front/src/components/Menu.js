import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container} from "react-bootstrap";

function menuIndex() {
  if (window.location.href.indexOf('home') > 0) {
    return 1
  }
  if (window.location.href.indexOf('songs') > 0) {
    return 2
  }

  if (window.location.href.indexOf('account') > 0) {
    return 3
  }

  if (window.location.href.indexOf('logout') > 0) {
    return 4
  }

  if (window.location.href.indexOf('login') > 0) {
    return 5
  }

  if (window.location.href.indexOf('register') > 0) {
    return 6
  }

  return
}

function Menu() {
  return (
    <Navbar bg="dark" variant="dark" style={{padding: '10px 40px'}}>
      <Container>
        <Navbar.Brand href="/home">Тексты песен</Navbar.Brand>
        <Nav variant="pills" activeKey={menuIndex()}>
          <Nav.Item>
            <Nav.Link eventKey="1" href="/home">
              Главная
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2" href="/songs">
              Песни
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Nav variant="pills" activeKey={menuIndex()}>
          {window.sessionStorage.getItem("loggedIn") === '1' ? 
            <>
              <Nav.Item>
                <Nav.Link>
                  {window.sessionStorage.getItem("username")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="4" onClick={async ()=>{await fetch(`http://localhost:5000/logout`, {method: 'POST'})
                    window.sessionStorage.setItem("loggedIn", 0);
                    window.sessionStorage.setItem("username", '');
                    window.location = `${window.location.origin}/home`
                  }}>
                  Выход
                </Nav.Link>
              </Nav.Item>
            </>
            : 
              <>
                <Nav.Item>
                  <Nav.Link eventKey="5" href="/login">
                    Вход
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="6" href="/register">
                    Регистрация
                  </Nav.Link>
                </Nav.Item>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
