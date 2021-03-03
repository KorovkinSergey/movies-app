import movieService from "../../API/MovieService"

async function updateGuestSession() {
	let result = null
	if (sessionStorage.getItem("guestSessionId")) {
		result = movieService.setGuestSessionId(
			sessionStorage.getItem("guestSessionId")
		)
		result = true
	}

	if (!sessionStorage.getItem("guestSessionId")) {
		try {
			result = await movieService.createNewGuestSession()
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e)
		}
	}

	return result
}

export default updateGuestSession
