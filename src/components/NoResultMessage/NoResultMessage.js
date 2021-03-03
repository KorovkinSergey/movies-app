import React from "react"
import { Alert } from "antd"
import PropTypes from "prop-types"


function NoResultMessage({ searchQuery }) {
	return (
		<div className="status">
			<Alert message={`No results by searching: "${searchQuery}"`} type="error"/>
		</div>
	)
}

NoResultMessage.defaultProps = {
	searchQuery: "no errors"
}

NoResultMessage.propTypes = {
	searchQuery: PropTypes.string
}
export default NoResultMessage
