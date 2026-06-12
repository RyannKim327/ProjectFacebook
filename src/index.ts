import * as dotenv from "dotenv"
import TwoHourToken from "./script/2hrs"
import FacebookPosting from "./script/posting"

export default async function ProjectFacebook() {
	dotenv.config()

	const POSTING_ACCESS_TOKEN: string = process.env.FB_TOKEN
	const PAGE_ID: string = process.env.PAGE_ID

	if (!POSTING_ACCESS_TOKEN && !PAGE_ID) {
		throw new Error(`Access Token or Page ID is not defined`)
	}

	// TODO: To generate a 2hr validity of token
	const fb_token = TwoHourToken(POSTING_ACCESS_TOKEN)
	const token = await fb_token()

	// TODO: Exports?
	const posting = FacebookPosting(token, PAGE_ID)
}

