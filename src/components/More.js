import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Container } from 'react-bootstrap';
import ReactStars from 'react-stars';

class Main extends Component {
    state = {
        more: [],
        star : 0,
        con: true
    }

    componentDidMount() {
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.moreid}?api_key=1ea54fff90d26ae7dc1f5e21fe637664&language=ru-RU`)
            .then((response) => {
                console.log(response); 
                this.setState(
                    { more: response.data, con: false }
                )
            }).catch((e) => {
                console.log('error');
            })
        console.log(this.state.more);
    }
    func = (y) => {
        this.setState({
            star:y.vote_average
        })
    }
        
    render() {
        let y = this.state.more
        console.log(y)
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <> 
                <div style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${y.backdrop_path})`}}  className='gl-img'>
                    <img className='mainImg' src={`https://image.tmdb.org/t/p/original/${y.poster_path}`}/>
                    <h1 style={{position:'absolute', bottom:50, left:270, color:'white'}}>{y.title}</h1>
                    <h4 style={{position:'absolute', bottom:20, left:270, color:'white'}}>{y.tagline}</h4>
                </div>
                <Container>
                    <div style={{marginLeft:115}}>
                        <ReactStars
                            className='mt-5 ml-5'
                            count={10}
                            half={true}
                            value={y.vote_average}
                            edit={false}
                            size={24}
                            color2={'#ffd700'} />
                    </div>
                    <p className='mt-1' style={{marginLeft:65}}>
                        {y.overview}
                    </p>
                </Container>
                
                    

            </>
        }
    }
export default Main;