import * as dotenv from "dotenv"
import TwoHourToken from "./script/2hrs"
import FacebookPosting from "./script/posting"

export default async function ProjectFacebook() {
	dotenv.config()

	const ACCESS_TOKEN: string = process.env.FB_TOKEN
	const PAGE_ID: string = process.env.PAGE_ID

	if (!ACCESS_TOKEN && !PAGE_ID) {
		throw new Error(`Access Token or Page ID is not defined`)
	}

	// TODO: To generate a 2hr validity of token
	const fb_token = TwoHourToken(ACCESS_TOKEN)
	const token = await fb_token()

	// TODO: Exports?
	const posting = FacebookPosting(token, PAGE_ID)
	posting({
		message: "This is a test post from cli",
		img: "https://ryannkim327.is-a.dev/assets/dark2-Dl_JxX-E.png"
	})

}

