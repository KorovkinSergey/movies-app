import React from "react"
import {Alert} from "antd"
import PropTypes from "prop-types"

function ErrorMessage({error}) {
	return (
		<div className="status status--margin-bottom">
			<Alert message={`Something goes wrong :(  ${error}`} type="error"/>
		</div>
	)
}

ErrorMessage.defaultProps = {
	error: "",
}

ErrorMessage.propTypes = {
	error: PropTypes.string,
}

export default ErrorMessage
