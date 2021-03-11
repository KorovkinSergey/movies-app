class MovieService {

	apiBase = "https://api.themoviedb.org/3/"

	apiKey = "?api_key=4510b0304ffae40aee790e9f4894b626"

	guestSessionId

	async getResourse(url, options = null) {
		try {
			let result

			if (!options) result = await fetch(url)

			if (options && typeof options === "object") result = await fetch(url, options)

			if (!result.ok) throw new Error(`Error code is: ${result.status}`)
			const body = await result.json()
			return body

		} catch (e) {
			throw new Error(e)
		}
	}

	getGenres() {
		const url = `${this.apiBase}genre/movie/list${this.apiKey}`
		return this.getResourse(url)
	}

	findMovie(keyWord, page) {
		const queryString = `&ne-US&query=${keyWord}&page=${page}&include_adult=false`
		const url = `${this.apiBase}search/movie${this.apiKey}${queryString}`
		return this.getResourse(url)
	}

	setGuestSessionId(guestSessionId) {
		this.guestSessionId = guestSessionId
	}

	async createNewGuestSession() {
		const url = `${this.apiBase}authentication/guest_session/new${this.apiKey}`
		await this.getResourse(url).then((response) => {
			this.setGuestSessionId(response.guest_session_id)
			sessionStorage.setItem("guestSessionId", this.guestSessionId)
		})
		return true
	}

	async rateMovie(id, value) {

		const url = `${this.apiBase}movie/${id}/rating${this.apiKey}&guest_session_id=${this.guestSessionId}`
		const options = {
			method: "POST",
			api_key: this.apiKey,
			movie_id: id,
			body: JSON.stringify({value}),
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		}
		try {
			await this.getResourse(url, options)
		} catch (e) {

			const errorCode = +e.message.slice(-3)

			if (errorCode === 401) {
				const refreshSession = await this.createNewGuestSession()
				if (refreshSession) this.rateMovie(id, value)
			}
		}
	}

	async getRatedMovies(page) {
		const url = `${this.apiBase}guest_session/${this.guestSessionId}/rated/movies${this.apiKey}&page=${page}`
		try {
			const ratedMovies = await this.getResourse(url)
			return ratedMovies
		} catch (e) {
			const errorCode = +e.message.slice(-3)
			if (errorCode === 401) {
				const refreshSession = await this.createNewGuestSession()
				if (refreshSession) return this.getRatedMovies()
			}
			return undefined
		}
	}
}

const movieService = new MovieService()

export default movieService
