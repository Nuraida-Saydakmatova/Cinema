import React, { Component } from 'react'
import axios from 'axios';
import {Card, Row, Col, Container,Button, ButtonGroup, Spinner}from 'react-bootstrap';
import {Link }from "react-router-dom";

export default class Home extends Component {
    state = {
        movie:[],
        con: true
    }

    componentDidMount(){
        const a = axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU')
        a.then((tvapi) =>{
            console.log(tvapi)
            this.setState({movie:tvapi.data.results, con: false})
        })
    }

    render() {
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <>
                <Container>
                    <h1>Сериалы</h1>
                    <Row>
                        {this.state.movie.map(y => {
                            return(
                                <>
                                    <Col xs={12} md={6} lg={3} className='mt-4 s img'>
                                        <Card style={{ width: '15rem' }} className='text-decoration-none' as={Link} to={`/cinemamore/${y.id}`}>
                                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${y.poster_path}`} />
                                            <Card.Body>
                                                <Card.Title >{y.title}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            )
                        })}
                    </Row>
                </Container>
            </>
        }
    }