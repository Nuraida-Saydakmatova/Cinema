import React, {Component} from 'react';
import axios from 'axios';
import {Col, Container, Row, Card, Spinner} from 'react-bootstrap';

class People extends Component {
    state = {
        celebrities: [],
        con: true
    }

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/person/popular?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=en-US&&page=1')
            .then((response) => {
                this.setState(
                    {celebrities: response.data.results, con: false}
                )
            }).catch((e) => {
            console.log('error');
        })
    }

    render() {
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <>
                <Container>
                    <h2>
                        Популярные люди
                    </h2>
                    <div className={'d-flex  justify-content-between flex-wrap'}>
                        {this.state.celebrities.map((v) => {
                            return (
                                <Card style={{width: '18rem'}} className={'m-lg-2 s flex-column'}>
                                    <Row>
                                        <Col xs={4}>
                                            <Card.Img variant="top" style={{width:100, height:190}} src={`https://image.tmdb.org/t/p/w500/${v.profile_path}`}/>
                                        </Col>
                                        <Col xs={8}>
                                            <Card.Body>
                                                <Card.Title>{v.name}</Card.Title>
                                                <Card.Text>
                                                    <strong>Популярно за:</strong>
                                                    <div>{v.known_for.map(v => v.title)}</div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                        )
                        })}
                    </div>
                </Container>
            </>     
        }
    }
export default People;