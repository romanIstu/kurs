import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import {Form, Col, Row, Button, Accordion, Badge, Alert} from "react-bootstrap"
import NotFound from './NotFound';

function Songs() {
  const [data, setData] = useState(undefined);
  const [show, setShow] = useState(false);

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);
  const [variant, setVariant] = useState('success')

  const fetchData = async () => {
    let url = 'http://localhost:5000/lyrics'    
    const data = await fetch(url).then(res => res.json()).then(data => data)                  
    setData(data);
  };

  const removeSong = async (id) => {
    await fetch(`http://localhost:5000/lyrics/remove/${id}`, { method: 'DELETE' });
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [])

  async function handleSubmit(e){
    e.preventDefault()
    let res = await fetch(`http://localhost:5000/addsong`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            text: text
        })
    })
    .then(res => res.json())
    .then(res => res)

    setMessage(res)
    setShow(false)
    setAlert(true)

    setName('')
    setText('')

    if (res === 'Песня успешно добавлена!') {
      setVariant('success')
    } else {
      setVariant('danger')
    }

    fetchData()
  }


  return (
    data === undefined ? 
    <>
      <NotFound text="Нет данных" />
    </>
    :

    <>
    <Col md={{ span: 8, offset: 2}} >
      <Row>
        <Col xs={9}>
          <h1 style={{marginTop: '40px', marginBottom: '40px'}}>Тексты популярных песен</h1>
        </Col>
        <Col xs={3} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          {window.sessionStorage.getItem("loggedIn") === '1' ? <Button onClick={()=>{setShow(true); setAlert(false)}}> + Добавить текст песни</Button> : <></>}
        </Col>
      </Row>

      <Alert show={alert} key={1} variant={variant} onClose={() => setAlert(false)} dismissible>{message}</Alert>

      {show ? <Row>
        <Col xs={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control value={name} type="text" placeholder="Название песни" onChange={(event)=>setName(event.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Текст</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Текст песни" onChange={(event)=>setText(event.target.value)}/>
            </Form.Group>
            <Button type="submit" variant="success" onClick={(event)=>handleSubmit(event)} >
              Добавить
            </Button>
          </Form>
        </Col>
      </Row> : <></>}
      <Accordion defaultActiveKey={data[0].id} style={{ marginTop: '30px' }} alwaysOpen>
        {data.map((item, i) => {
          return <Accordion.Item key={item.id} eventKey={item.id} style={{ background: 'rgba(0,0,0,.75)' }}>
            <Accordion.Header>
            <Col xs={10}>
              #{item.id} {item.name}  
            </Col>
            {window.sessionStorage.getItem("loggedIn") === '1' ? 
              <Col xs={1}>
                <Badge style={{marginLeft: '20px'}} bg="danger" onClick={()=>removeSong(item.id)}>Удалить</Badge> 
              </Col>
            : <></>}
            </Accordion.Header>
            <Accordion.Body>
              {item.text}
              <br></br>
              
            </Accordion.Body>
          </Accordion.Item>
        })}
      </Accordion>
    </Col>

   
     
      
    </>
  );
}

export default Songs;
