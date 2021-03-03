import React, {useState} from "react"
import PropTypes from "prop-types"

import {Input, Pagination} from "antd"
import LoadingMessage from "../../components/LoadingMessage"
import CardList from "../../components/Card/CardList"
import NoResultMessage from "../../components/NoResultMessage"
import ErrorMessage from "../../components/ErrorMessage"

import "./SearchPage.scss"

function SearchPage({
											updateInput,
											loading,
											haveResult,
											movies,
											error,
											searchQuery,
											changeCurrentPage,
											totalItems,
											ratedMovies,
										}) {


	const [currentPage, setCurrentPage] = useState(1)

	return (
		<div className="container container--fill-height">

			<div className="container container--max-width">

				<Input className="search-panel" placeholder="Search" onChange={e => updateInput(e.target.value)}/>

			</div>

			<main className="container container--max-width">

				{loading && <LoadingMessage/>}

				{haveResult && (<CardList movies={movies} ratedMovies={ratedMovies}/>)}

				{!haveResult && !loading && !error && (<NoResultMessage searchQuery={searchQuery}/>)}

				{error && <ErrorMessage error={error}/>}

			</main>

			<div className="container container--max-width">


				<Pagination
					defaultPageSize={20}
					showSizeChanger={false}
					className="pagination"
					current={currentPage}
					onChange={newPage => {
						changeCurrentPage(newPage)
						setCurrentPage(newPage)
					}}
					total={totalItems}
				/>

			</div>

		</div>
	)
}

SearchPage.propTypes = {
	updateInput: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	haveResult: PropTypes.bool.isRequired,
	movies: PropTypes.array.isRequired,
	ratedMovies: PropTypes.array.isRequired,
	error: PropTypes.bool.isRequired,
	searchQuery: PropTypes.string.isRequired,
	changeCurrentPage: PropTypes.func.isRequired,
	totalItems: PropTypes.number.isRequired,

}

export default SearchPage
