import React from "react"
import PropTypes from "prop-types"

import LoadingMessage from "../../components/LoadingMessage"
import CardList from "../../components/Card/CardList"
import NoResultMessage from "../../components/NoResultMessage"
import ErrorMessage from "../../components/ErrorMessage"

function RatedPage({loading, ratedMovies, error}) {
	return (
		<div className="container container--fill-height">

			<main className="container container--max-width">

				{loading && <LoadingMessage/>}

				{ratedMovies.length > 0 && (<CardList movies={ratedMovies} ratedMovies={ratedMovies}/>)}

				{ratedMovies.length === 0 && !loading && !error && (<NoResultMessage searchQuery="No rated movies"/>)}

				{error && <ErrorMessage error={error}/>}

			</main>
		</div>
	)
}

RatedPage.propTypes = {
	loading: PropTypes.bool.isRequired,
	ratedMovies: PropTypes.array,
	error: PropTypes.bool.isRequired,
}

RatedPage.defaultProps = {
	ratedMovies: [],
}

export default RatedPage
