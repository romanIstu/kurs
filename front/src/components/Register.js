import React, {useState} from 'react';
import {Col, Button, Form, Alert} from "react-bootstrap"

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [variant, setVariant] = useState('');
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    
    async function handleSubmit(e){
        e.preventDefault()
        console.log(username, password)
        let res = await fetch(`http://localhost:5000/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(res => res)

        setMessage(res)
        setShow(true)
        if (res === 'OK') {
            setDisabled(true)
            setVariant('success')
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.location = `${window.location.origin}/login`
        } else {
            setDisabled(false)
            setVariant('danger')
        }
    }
    return (
    <>
        <Col md={{ span: 2, offset: 5}} >
            <h1 style={{marginTop: '150px'}}>Регистрация</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Пользователь</Form.Label>
                    <Form.Control disabled={disabled} type="username" placeholder="Имя пользователя" 
                        onChange={(event)=>setUsername(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control disabled={disabled}  type="password" placeholder="Пароль" 
                        onChange={(event)=>setPassword(event.target.value)}
                    />
                </Form.Group>
                {show ? <Alert key={1} variant={variant}>
                    {variant === 'success' ?
                        <>
                            Аккаунт "{username}" успешно зарегистрирован!<br/>
                            <Alert.Link href="/login">Войти</Alert.Link>.                    
                        </>
                    :
                        <>
                            {message}
                        </>
                    }
                </Alert> : <></>}
                <Button  disabled={disabled} variant="primary" onClick={(event)=>handleSubmit(event)}>
                    Регистрация
                </Button>
            </Form>
        </Col>
    </>
  );
}

export default Login;
