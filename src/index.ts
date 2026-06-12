import * as dotenv from "dotenv"
import TwoHourToken from "./script/two-hour-token"
import FacebookPosting from "./script/posting"
import FacebookMessaging from "./script/messaging"

export default async function ProjectFacebook() {
	dotenv.config()

	const POSTING_ACCESS_TOKEN: string = process.env.FEED_TOKEN
	const PAGE_ID: string = process.env.PAGE_ID
	const MESSAGING_TOKEN: string = process.env.MESSENGER_TOKEN

	if (!POSTING_ACCESS_TOKEN && !PAGE_ID) {
		throw new Error(`Access Token or Page ID is not defined`)
	}

	// TODO: To generate a 2hr validity of token
	const fb_token = TwoHourToken(POSTING_ACCESS_TOKEN)
	const token = await fb_token()

	// INFO: News feed related
	const posting = FacebookPosting(token, PAGE_ID)

	// INFO: Messaging related
	const messenger = FacebookMessaging({
		token: MESSAGING_TOKEN,
		hostname: process.env.HOSTNAME,
		assets: process.env.ASSETS,
		temp: process.env.TEMP_FILES
	})

	return {
		messenger,
		posting
	}
}
