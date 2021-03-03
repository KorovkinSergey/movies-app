import React from "react"
import { Spin } from "antd"

function LoadingMessage() {
	return (
		<div className="status status--margin-bottom">
			<Spin size="large" tip="Loading..." />
		</div>
	)
}

export default LoadingMessage
