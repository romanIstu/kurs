import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Card, Button} from "react-bootstrap"

function Home() {
  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 3}} >
            <Card border="white" style={{ background: 'rgba(0,0,0,.5)', marginTop: '30px', minHeight: '600px' }}>
              <Card.Img variant="top" src="https://avatars.yandex.net/get-music-content/175191/8d2eb74f.p.953565/1000x1000" />
              <Card.Body>
                <Card.Title>Виктор Робертович Цой</Card.Title>
                <Card.Text>
                  Советский рок-музыкант, автор песен, поэт, художник и киноактёр. Основатель и лидер рок-группы «Кино»
                  Основатель и лидер рок-группы «Кино».
                </Card.Text>
              </Card.Body>
              <Button variant="primary" href="/songs">Ознакомиться</Button>
            </Card>
          </Col>
          <Col md={{ span: 3}} >
            <Card border="white" style={{ background: 'rgba(0,0,0,.5)', marginTop: '30px', minHeight: '600px'  }}>
              <Card.Img variant="top" src="https://avatars.yandex.net/get-music-content/2433821/b6d05de1.p.41114/1000x1000" />
              <Card.Body>
                <Card.Title>Би-2</Card.Title>
                <Card.Text>
                Би-2 — белорусская и российская рок-группа, образованная в 1988 году в Бобруйске. Основатели и бессменные участники — Шура Би-2 (гитара, вокал) и Лёва Би-2 (основной вокал).
                </Card.Text>
              </Card.Body>
              <Button variant="primary" href="/songs">Ознакомиться</Button>
            </Card>
          </Col>
          <Col md={{ span: 3}} >
            <Card border="white" style={{ background: 'rgba(0,0,0,.5)', marginTop: '30px', minHeight: '600px'  }}>
              <Card.Img variant="top" src="https://avatars.yandex.net/get-music-content/192707/179c880a.p.13002/1000x1000" />
              <Card.Body>
                <Card.Title>Rammstein</Card.Title>
                <Card.Text>
                Rammstein — немецкая метал-группа, образованная в январе 1994 года в Берлине. Музыкальный стиль группы относится к жанру индастриал-метала (конкретно — его немецкой сцене Neue Deutsche Härte).
                </Card.Text>
              </Card.Body>
              <Button variant="primary" href="/songs">Ознакомиться</Button>
            </Card>
          </Col>
          <Col md={{ span: 3}} >
            <Card border="white" style={{ background: 'rgba(0,0,0,.5)', marginTop: '30px', minHeight: '600px'  }}>
              <Card.Img variant="top" src="https://avatars.yandex.net/get-music-content/4406810/fdb802b3.p.430384/1000x1000" />
              <Card.Body>
                <Card.Title>Николай Вячеславович Расторгуев</Card.Title>
                <Card.Text>
                «Любэ» — советская и российская рок-группа, основанная 14 января 1989 года. Творчество коллектива ориентировано на рок-музыку с использованием элементов авторской и военной песни.
                </Card.Text>
              </Card.Body>
              <Button variant="primary" href="/songs">Ознакомиться</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
