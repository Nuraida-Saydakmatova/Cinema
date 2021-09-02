import React, { Component } from 'react'
import axios from 'axios';
import {Card, Row, Col, Container, Spinner}from 'react-bootstrap';
import {Link}from "react-router-dom";

export default class Home extends Component {
    state = {
        tv:[],
        con: true
    }
    componentDidMount(){
        const b = axios.get("https://api.themoviedb.org/3/tv/popular?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU");
        b.then((tor) => {
            console.log(tor)
            this.setState({tv: tor.data.results, con: false})
        });
    }
    render() {
        
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <>
                <Container>
                    <h1>Фильмы</h1>
                    <Row>
                        {this.state.tv.map((y) => {
                            return(
                                <Col xs={12} md={6} lg={3} className='mt-3 s img'>
                                <Card style={{ width: '15rem' }} as={Link} to={`/tvmore/${y.id}`} className='text-decoration-none'>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${y.poster_path}`} />
                                    <Card.Body>
                                        <Card.Title style={{alignItems:'center'}}  >{y.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            )
                        })}
                    </Row>
                </Container>
            </>
        
    }
}