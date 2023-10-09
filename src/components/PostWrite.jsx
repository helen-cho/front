import axios from 'axios';
import React, { useState } from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const PostWrite = () => {
    const navigator=useNavigate();
    const [form, setForm] = useState({
        title:'',
        body:'',
        writer:'green'
    });
    
    const {title, body} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async() => {
        if(title === '') {
            alert('제목을 입력하세요!');
        }else if(body === '') {
            alert('내용을 입력하세요!');
        }else{
            if(window.confirm('위 내용을 저장하실래요?')){
                await axios.post('/posts/insert', form);
                navigator('/posts');
            }
        }
    }

    const onReset = () => {
        setForm({
            ...form,
            title: '',
            body: ''
        });
    }

    return (
        <Row className='my-5'>
            <Col className='p-5'>
                <h1 className='text-center my-5'>글쓰기</h1>
                <Form>
                    <Form.Control placeholder='제목을 입력하세요.'
                        className='my-3' name='title' value={title} onChange={onChange}/>
                    <Form.Control as='textarea' rows={10} placeholder='내용을 입력하세요.'
                        className='my-3' name='body' value={body} onChange={onChange}/>
                    <div className='text-center'>
                        <Button className='mx-2 px-3 btn-sm' 
                            onClick={onSubmit}>저장</Button>
                        <Button className='mx-2 px-3 btn-sm' 
                            onClick={onReset} variant='secondary'>취소</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default PostWrite