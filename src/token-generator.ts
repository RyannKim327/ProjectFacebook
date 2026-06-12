import TokenGenerator from "./script/token-generator";
import * as dotenv from "dotenv"

dotenv.config()

// INFO: For user please do fill-up the following to generate a long term token
const APP_ID: string = process.env.APP_ID ?? ""
const APP_SECRET: string = process.env.APP_SECRET ?? ""
const SHORT_TERM_TOKEN: string = process.env.SHORT_TERM_TOKEN ?? ""

if (APP_ID === "" || APP_SECRET === "" || SHORT_TERM_TOKEN === "") {
	throw new Error(`These data are required to generate long term token: APP_ID, APP_SECRET, SHORT_TERM_TOKEN`)
} else {
	TokenGenerator(
		APP_ID as string,
		APP_SECRET as string,
		SHORT_TERM_TOKEN as string
	)
}
