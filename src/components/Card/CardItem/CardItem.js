import React from "react"
import PropTypes from "prop-types"
import { Typography, Rate } from "antd"
import parse from "date-fns/parse"
import format from "date-fns/format"
import Context from "../../../MovieSeviceContext/MovieSeviceContext"
import textCutter from "../../../functionHelpers/TextCutter/TextCutter"
import "./CardItem.sass"

import AverageRating from "../AverageRating"

function CardItem({title, releaseDate, genresIds, coverPath, description, id, myRating, averageRating}) {
	const { Title, Text } = Typography

	let textLength = 280

	if (window.matchMedia("screen and (min-width: 1010px)").matches) textLength = 130

	const descriptionToRender = textCutter(description, textLength)

	let dateToRender = "no release date"

	try {
		const dateString = parse(releaseDate, "yyyy-MM-dd", new Date())
		dateToRender = format(dateString, "MMMM d, yyyy")
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(`no release date for film: ${title}`)
	}

	const genresToRender = ({genres}) => {

		const movieGenres = genres.filter(genreObj => genresIds.includes(genreObj.id, 0))

		return movieGenres.map((genre) => (
			<Text keyboard key={genre.name}>
				{genre.name}
			</Text>
		))
	}

	let posterUrl = false

	if (coverPath) posterUrl = `https://image.tmdb.org/t/p/w500/${coverPath}`

	return (
		<Context.Consumer>
			{({ movieService, genres }) => (
				<div className="card card--margin-bottom">
					<div className="card__img-wrapper">

						{posterUrl && (<img className="card__img" src={posterUrl} alt="film cover"/>)}

						{!posterUrl && (<span className="card__img card__img--no-data">&#10067;</span>)}

					</div>

					<div className="card__header__text-block">

						<Title level={4}>{title}</Title>

						<Text type="secondary">{dateToRender}</Text>

						<div className="card__genres">

							{genresToRender(genres)}

						</div>

					</div>

					<div className="card__description">

						<Text>{descriptionToRender}</Text>

					</div>

					<Rate
						className="rating rating--margin"
						defaultValue={myRating}
						count={10}
						onChange={(value) => {movieService.rateMovie(id, value)}}
					/>

					<AverageRating averageRating={averageRating} />

				</div>
			)}
		</Context.Consumer>
	)
}

CardItem.propTypes = {
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	genresIds: PropTypes.array,
	coverPath: PropTypes.string,
	description: PropTypes.string,
	id: PropTypes.number,
	myRating: PropTypes.number,
	averageRating: PropTypes.number,
}

CardItem.defaultProps = {
	title: "no title",
	releaseDate: "no data",
	genresIds: [],
	coverPath: "no img url",
	description: "no description",
	id: 0,
	myRating: 0,
	averageRating: 1,
}

export default CardItem
