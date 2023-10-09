import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Button, Card} from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';

const PostRead = () => {
    const { id }= useParams();
    const navigator = useNavigate();
    const [form, setForm] = useState({
        id: id,
        title: '',
        body: '',
        wdate: '',
        writer: ''
    });
    const { title, body, wdate, writer } = form;

    const callAPI = async() => {
        const result = await axios.get('/posts/read/' + id);
        setForm(result.data);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const onDelete = async() => {
        if(window.confirm(id + '번 게시글을 삭제하실래요?')) {
            await axios.post('/posts/delete/' + id);
            navigator('/posts');
        }
    }

    return (
        <Row className='my-5'>
            <Col className='px-5'>
                <h1 className='my-5 text-center'>게시글정보</h1>
                <div className='text-end my-2'>
                    <Link to={`/posts/update/${id}`}>
                        <Button className='btn-sm mx-2'>수정</Button>
                    </Link>
                    <Button className='btn-sm' variant='danger'
                        onClick={onDelete}>삭제</Button>
                </div>
                <Card>
                    <Card.Body>
                        <h5>[{id}] {title}</h5>
                        <hr/>
                        <div>{body}</div>
                    </Card.Body>
                    <Card.Footer>
                        Created on {wdate} by {writer}
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default PostRead