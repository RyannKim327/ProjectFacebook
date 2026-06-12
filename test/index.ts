import ProjectFacebook from "../src"

(async () => {
	const project = await ProjectFacebook()
	project.posting("Hello po, paano matulog ang kuba?", (err, res) => {
		if (err) {
			console.error(err)
		} else {
			console.log(res)
		}
	})
})()
