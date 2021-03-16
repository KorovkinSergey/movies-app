import React, {Component} from "react"
import debounce from "lodash.debounce"
import {Tabs} from "antd"

import SearchPage from "./components/Page/SearchPage"
import RatedPage from "./components/Page/RatedPage"

import movieService from "./API/MovieService"
import updateGuestSession from "./functionHelpers/updateGuestSession"
import Context from "./MovieSeviceContext/MovieSeviceContext"

import "./App.sass"

class App extends Component {

	state = {
		searchQuery: "a",
		movies: [],
		ratedMovies: [],
		currentPage: 1,
		currentRatedPage: 1,
		loading: true,
		error: false, //	error.message == string
		totalItems: 0,
		totalRatedItems: 0,
	}


	debounceUpdateMovie = debounce((text, page) => this.updateMovies(text, page), 1000)

	componentDidMount() {
		const {searchQuery, currentPage} = this.state
		this.setState({loading: true})

		movieService.getGenres().then((genres) => {
			this.genres = genres
		})

		if (updateGuestSession()) this.updateMovies(searchQuery, currentPage)

	}

	componentDidCatch(e) {
		this.setError(e)
	}

	setRatedMoviesToState(page) {
		movieService.getRatedMovies(page).then((ratedMovies) => {
			if (ratedMovies) {
				this.setState(prev => {
					const addRated = ratedMovies.results.filter(item => !prev.ratedMovies.find(el => el.id === item.id))
					return {
						ratedMovies: [...prev.ratedMovies, ...addRated],
						totalRatedItems: ratedMovies.total_results
					}
				})
			}
		})
	}

	setError(e) {
		this.setState({error: e})
	}

	updateMovies(searchQuery, page) {
		movieService.findMovie(searchQuery, page)
			.then((data) => {
				this.setState({
					error: false,
					searchQuery,
					movies: data.results,
					totalItems: data.total_results,
					currentPage: data.page,
					loading: false
				})
			})
			.catch((e) => {
				this.setError(e)
				this.setState({searchQuery, movies: []})
			})
	}

	updateInput(value) {
		const {currentPage} = this.state

		this.setState({
			searchQuery: value,
		})
		this.debounceUpdateMovie(value, currentPage)
	}

	changeCurrentPage(newPage) {
		const {searchQuery} = this.state
		this.setRatedMoviesToState(newPage)
		this.updateMovies(searchQuery, newPage)
	}

	changeCurrentRatedPage(newPage) {
		this.setState({currentRatedPage: newPage})
		this.setRatedMoviesToState(newPage)
	}

	myRateMovie(id, value) {
		const {currentRatedPage} = this.state
		movieService.rateMovie(id, value).then(() => {
			setTimeout(() => {
				this.setRatedMoviesToState(currentRatedPage)
			}, 700)
		})
	}

	render() {
		const {
			movies,
			ratedMovies,
			totalItems,
			error,
			loading,
			searchQuery,
			currentPage,
			currentRatedPage,
			totalRatedItems
		} = this.state

		const {TabPane} = Tabs

		const haveResult = !!movies.length

		return (
			<Context.Provider value={{movieService, genres: this.genres, myRateMovie: this.myRateMovie.bind(this)}}>
				<div className="container container--fill-height">
					<Tabs
						defaultActiveKey="1"
						centered
						onChange={(key) => {
							if (key === "1") this.updateMovies(searchQuery, currentPage)
							if (key === "2") this.setRatedMoviesToState(currentRatedPage)
						}}>
						<TabPane tab="Search" key="1">
							<SearchPage
								updateInput={(value) => {
									this.updateInput(value)
								}}
								loading={loading}
								haveResult={haveResult}
								movies={movies}
								ratedMovies={ratedMovies}
								error={error}
								searchQuery={searchQuery}
								changeCurrentPage={newPage => this.changeCurrentPage(newPage)}
								totalItems={totalItems}

							/>
						</TabPane>
						<TabPane tab="Rated" key="2">
							<RatedPage
								loading={loading}
								ratedMovies={ratedMovies}
								error={error}
								changeCurrentRatedPage={newPage => this.changeCurrentRatedPage(newPage)}
								totalItems={totalRatedItems}
							/>
						</TabPane>
					</Tabs>
				</div>
			</Context.Provider>
		)
	}
}

export default App
