import React, { Component } from 'react'
import axios from 'axios';
import {Card, Row, Col, Container,Button, ButtonGroup, Spinner}from 'react-bootstrap';
import { Link}from "react-router-dom";

export default class Home extends Component {
    state = {
        movie:[],
        movieb:false,
        tv:[],
        con:true,
    }

    componentDidMount(){
        const a = axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU')
        a.then((tvapi) =>{
            console.log(tvapi)
            this.setState({movie:tvapi.data.results, con: false})
        })
        const b = axios.get("https://api.themoviedb.org/3/tv/popular?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU");
        b.then((tor) => {
            console.log(tor)
            this.setState({tv: tor.data.results, con: false})
        });
    }
    Movie = () => {
        this.setState({movieb:true})
    }
    Tv =() =>{
        this.setState({movieb:false})
    }

    render() {
        return (this.state.con? <Spinner className={'spiner'} animation="border" />:
            <>
                <Container>
                    <Row>  
                        <div className='mt-3 d-flex justify-content-between'>
                            <span style={{fontSize:30}}>Что Популярно</span>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary" onClick={()=>{this.Tv()}}>По ТВ</Button>
                                <Button variant="primary" onClick={()=>{this.Movie()}}>В кинотеатрах</Button>
                            </ButtonGroup>
                        </div>
                
                        {this.state.movieb? this.state.movie.map(y => {
                            return( this.state.con? <Spinner className={'spiner'} animation="border" />:
                                <>
                                    <Col xs={12} md={6} lg={3} className='mt-4'>
                                        <Card style={{ width: '15rem' }} className='text-decoration-none' as={Link} to={`/cinemamore/${y.id}`}>
                                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${y.poster_path}`} />
                                            <Card.Body>
                                                <Card.Title style={{textAlign: 'center'}} >{y.title}</Card.Title>
                                            </Card.Body>
                                            <p>{y.first_air_date}</p>
                                        </Card>
                                    </Col>
                                </>
                                    )
                        }):this.state.tv.map(y => {
                            return( this.state.con? <Spinner className={'spiner'} animation="border" />:
                                <>
                                    <Col xs={12} md={6} lg={3} className='mt-4 img s'>
                                        <Card style={{ width: '15rem' }} className='text-decoration-none' as={Link} to={`/tvmore/${y.id}`}>
                                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${y.poster_path}`} />
                                            <Card.Body>
                                                <Card.Title >{y.name}</Card.Title>
                                                <p>{y.first_air_date}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            )
                        })}

                        <div className='mt-3 d-flex justify-content-between'>
                            <span style={{fontSize:30}}>Что в тренде</span>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary" onClick={()=>{this.Tv()}}>Сегодня</Button>
                                <Button variant="secondary" onClick={()=>{this.Movie()}}>На этой недели</Button>
                            </ButtonGroup>
                        </div>
                
                        {this.state.movieb ? this.state.movie.map(y => {
                            return( this.state.con? <Spinner className={'spiner'} animation="border" />:
                                <>
                                    <Col xs={12} md={6} lg={3} className='mt-4'>
                                        <Card style={{ width: '15rem' }} className='text-decoration-none' as={Link} to={`/cinemamore/${y.id}`}>
                                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${y.poster_path}`} />
                                            <Card.Body>
                                                <Card.Title >{y.title}</Card.Title>
                                                <p>{y.first_air_date}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            )

                        }):this.state.tv.map(y => {
                            return( this.state.con? <Spinner className={'spiner'} animation="border" />:
                                <>
                                    <Col xs={12} md={6} lg={3} className='mt-4'>
                                        <Card style={{ width: '15rem' }} className='text-decoration-none' as={Link} to={`/tvmore/${y.id}`}>
                                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${y.poster_path}`} />
                                                <Card.Body>
                                                    <Card.Title >{y.name}</Card.Title>
                                                    <p>{y.first_air_date}</p>
                                                </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            )
                        })}
                    </Row>
                </Container>
                
               
            </>
        )
    }
}
