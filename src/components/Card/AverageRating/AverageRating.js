import React from "react"
import PropTypes from "prop-types"
import "./AverageRating.sass"

function AverageRating({ averageRating }) {
	let color = "#E90000"

	if (averageRating > 3 && averageRating <= 5) color = "#E97E00"

	if (averageRating > 5 && averageRating <= 7) color = "#E9D100"

	if (averageRating > 7) color = "#66E900"

	return (
		<div style={{ borderColor: color }} className="average-rating">
			<p>{averageRating}</p>
		</div>
	)
}

AverageRating.defaultProps = {
	averageRating: 0,
}

AverageRating.propTypes = {
	averageRating: PropTypes.number,
}

export default AverageRating
