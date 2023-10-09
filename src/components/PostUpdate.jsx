import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const PostUpdate = () => {
    const {id} = useParams();
    const navigator = useNavigate();
    const [form, setForm] = useState({
        id: id,
        title: '',
        body: '',
        wdate: '',
        writer: ''
    });
    const {title, body, wdate, writer} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const onSubmit = async() => {
        if(title === '') {
            alert('제목을 입력하세요!');
        }else if(body === '') {
            alert('내용을 입력하세요!');
        }else{
            if(window.confirm('위 내용을 수정하실래요?')){
                await axios.post('/posts/update', form);
                navigator(-1);
            }
        }
    }
    const onReset = () => {
        callAPI();
    }

    const callAPI = async() => {
        const result = await axios.get('/posts/read/' + id);
        setForm(result.data);
    }

    useEffect(()=>{
        callAPI();
    },[]);

    return (
        <Row className='my-5'>
            <Col className='px-5'>
                <h1 className='text-center'>게시글 정보수정</h1>
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

export default PostUpdate