export default function textCutter(text, length) {
	let newText

	if (text.length <= length) newText = text

	if (text.length > length) {
		const lastWord = text[length]

		if (lastWord === " ") newText = `${text.slice(0, length)} ...`

		if (lastWord !== " ") {
			const lastSpaceIndex = text.lastIndexOf(" ", length)
			newText = `${text.slice(0, lastSpaceIndex)} ...`
		}
	}

	return newText
}

