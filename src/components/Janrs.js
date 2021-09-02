import React, { Component } from 'react'
import axios from 'axios';
import {Card, Row, Col, Container, Spinner}from 'react-bootstrap';

export default class Home extends Component {
    state = {
        janrs:[],
        con: true,
    }
    reguest = () =>{
        const a = axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${this.props.match.params.janrsid}&api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru`);
        a.then((tvapi) =>{
            console.log(tvapi)
            this.setState({janrs:tvapi.data.results, con:false})
        })
    }
    componentDidMount(){
        this.reguest()
    }
    componentDidUpdate(){
        this.reguest()
    }
    render() {
        return (this.state.con? <Spinner className={'spiner'} animation="border"/>:
            <>
                <Container>
                    <Row>  
                        {this.state.janrs.map(y => {
                            return(
                                <>
                                    <Col xs={12} md={6} lg={3} className='mt-4'>
                                        <Card style={{ width: '15rem' }} >
                                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${y.poster_path}`} />
                                            <Card.Body>
                                                <Card.Title>{y.name}</Card.Title>
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
