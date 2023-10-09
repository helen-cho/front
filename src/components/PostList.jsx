import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Table, Button} from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const PostList = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const param_page=search.get('page');
    const page = param_page === null ? 1 : parseInt(param_page);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [last, setLast] = useState(1);

    const callAPI = async() => {
        setLoading(true);
        const result = await axios.get(`/posts?page=${page}`);
        //console.log(result.data);
        const result1 = await axios.get('/posts/total');
        //console.log(result1.data.total);
        setPosts(result.data);
        setLast(Math.ceil(result1.data.total/5));
        setLoading(false);
    }

    useEffect(()=>{
        callAPI();
    }, [page]);

    if(loading) return <h1 className='my-5 text-center'>로딩중입니다......</h1>
    return (
        <Row className='my-5'>
            <Col className='mx-3'>
                <h1 className='text-center'>게시글</h1>
                <div className='text-end mb-5'>
                    <Link to='/posts/write'>
                        <Button>글쓰기</Button>
                    </Link>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Title</td>
                            <td>Date</td>
                            <td>Writer</td>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post=>
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                            <td>{post.wdate}</td>
                            <td>{post.writer}</td>
                        </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
            <div className='text-center'>
                <Link to={`/posts?page=${page-1}`} disabled={page===1 && true}>
                    <Button className='mx-2'>이전</Button>
                </Link>
                <span className='mx-2'>{page} / {last}</span>
                <Link to={`/posts?page=${page+1}`}>
                    <Button className='mx-2' disabled={page===last && true}>다음</Button>
                </Link>
            </div>
        </Row>
    )
}

export default PostList