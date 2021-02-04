import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';

import './movie-card.scss';


export default class MovieCard extends Component {
	render() {
    const { movie } = this.props;

		return (
			<div className="movie-card h-100">
				<Card style={{ minWidth: '16rem'}}>
					<Link to={`/movies/${movie._id}`}>
						<Card.Img variant="top" src={movie.imageUrl} className="movie-card--image" />
					</Link>
				</Card>
			</div>
		);
	}
}
