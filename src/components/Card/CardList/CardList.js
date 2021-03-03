import React from "react"
import PropTypes from "prop-types"
import CardItem from "../CardItem"


function CardList({movies, ratedMovies}) {

	return movies.map(movie => {

		let myRating = null

		const ratedMovie = ratedMovies.filter(rated => rated.id === movie.id)

		if (ratedMovie.length !== 0) myRating = ratedMovie[0].rating

		return (
			<CardItem
				key={movie.id}
				title={movie.title}
				releaseDate={movie.release_date}
				genresIds={movie.genre_ids}
				coverPath={movie.poster_path}
				description={movie.overview}
				id={movie.id}
				myRating={myRating}
				averageRating={movie.vote_average}
			/>
		)
	})

}

CardList.defaultProps = {
	movies: [],
	ratedMovies: [],
}

CardList.propTypes = {
	movies: PropTypes.array,
	ratedMovies: PropTypes.array,
}

export default CardList
