import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import PostList from './PostList';
import PostWrite from './PostWrite';
import PostRead from './PostRead';
import PostUpdate from './PostUpdate';

const RouterPage = () => {
    const navigator = useNavigate();

    const onClickHome = (e) => {
        e.preventDefault();
        navigator('/')
    }
    const onClickPosts = (e) => {
        e.preventDefault();
        navigator('/posts');
    }

    return (
        <>
            <Navbar bg="primary"  data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#" onClick={onClickHome}>React</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#" onClick={onClickHome}>Home</Nav.Link>
                            <Nav.Link href="#" onClick={onClickPosts}>게시글</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path='/' element={<HomePage/>}/> 
                <Route path='/posts' element={<PostList/>}/>
                <Route path='/posts/write' element={<PostWrite/>}/>
                <Route path='/posts/:id' element={<PostRead/>}/>
                <Route path='/posts/update/:id' element={<PostUpdate/>}/>
            </Routes>
        </>
    )
}

export default RouterPage