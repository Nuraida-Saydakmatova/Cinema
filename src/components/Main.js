import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,

} from "react-router-dom";
import {Container, Navbar, Nav, NavDropdown, ListGroup, Row, Col,  Spinner} from 'react-bootstrap';
import Home from './Home';
import axios from 'axios';
import Janrs from './Janrs'
import People from './People'
import Film from './Film';
import Serial from './Serial';
import More from './More';
import More2 from './More2';

export default class Main extends Component {
    state = {
        genre:[],
        janrs: [],
        con: true
    }

    componentDidMount(){
        const a = axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=RU')
        a.then((tvapi) =>{
            console.log(tvapi)
            this.setState({genre:tvapi.data.genres, con: false})
        })
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU')
        .then((response) => {
            this.setState(
                { janrs: response.data.genres, con: false }
            )
        }).catch((e) => {
            console.log('error');
        })
    }

    render() {
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to='/'>Синематика</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to='/'>Главная</Nav.Link>
                                <Nav.Link as={Link} to='/film'>Фильмы</Nav.Link>
                                <Nav.Link as={Link} to='/serial'>Сериалы</Nav.Link>
                                <Nav.Link as={Link} to='/people'>Люди</Nav.Link>
                                <NavDropdown title="Жанры" id="collasible-nav-dropdown">
                                    {this.state.genre.map(y => <NavDropdown.Item as={Link} to={`/janrs/${y.id}`}>{y.name}</NavDropdown.Item>)}
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                
                <Row>
                    <Col xs={9} > 
                        <Switch>
                            <Route path="/cinemamore/:moreid" component={More}/>
                            <Route path="/tvmore/:more2id" component={More2}/>
                            <Route path="/janrs/:janrsid" component={Janrs}/>
                            <Route path="/people">
                                <People/>
                            </Route>
                            <Route path="/serial">
                                <Serial/>
                            </Route>
                            <Route path="/film">
                                <Film/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </Col>
                    <Col xs={3}> 
                    <Container>
                        <ListGroup className='mt-4' >
                            {this.state.janrs.map((v) => {
                                return (
                                    <ListGroup.Item as={Link} to={`/janrs/${v.id}`}>
                                        {v.name}
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    </Container>
                    </Col>
                </Row>
            </>
        }
    }
