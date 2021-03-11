import React, {useState} from "react"
import PropTypes from "prop-types"

import {Pagination} from 'antd'
import LoadingMessage from "../../LoadingMessage"
import CardList from "../../Card/CardList"
import NoResultMessage from "../../NoResultMessage"
import ErrorMessage from "../../ErrorMessage"

function RatedPage({loading, ratedMovies, error, changeCurrentRatedPage, totalItems}) {

	const [currentPage, setCurrentPage] = useState(1)

	return (
		<div className="container container--fill-height">

			<main className="container container--max-width">

				{loading && <LoadingMessage/>}

				{ratedMovies.length > 0 && (<CardList movies={ratedMovies} ratedMovies={ratedMovies}/>)}

				{ratedMovies.length === 0 && !loading && !error && (<NoResultMessage searchQuery="No rated movies"/>)}

				{error && <ErrorMessage error={error}/>}


			</main>
			<div className="container container--max-width">


				<Pagination
					defaultPageSize={20}
					showSizeChanger={false}
					className="pagination"
					current={currentPage}
					onChange={newPage => {
						changeCurrentRatedPage(newPage)
						setCurrentPage(newPage)
					}}
					total={totalItems}
				/>

			</div>
		</div>
	)
}

RatedPage.propTypes = {
	loading: PropTypes.bool.isRequired,
	ratedMovies: PropTypes.array,
	error: PropTypes.bool.isRequired,
	changeCurrentRatedPage: PropTypes.func.isRequired,
	totalItems: PropTypes.number.isRequired,
}

RatedPage.defaultProps = {
	ratedMovies: [],
}

export default RatedPage
