import axios from "axios"
import * as fs from "fs"

// NOTE: Don't touch this script

export default async function TokenGenerator(APP_ID: string, APP_SECRET: string, TWO_HOUR_TOKEN: string) {
	const { data } = await axios.get(`https://graph.facebook.com/oauth/access_token`, {
		params: {
			grant_type: "fb_exchange_token",
			client_id: APP_ID,
			client_secret: APP_SECRET,
			fb_exchange_token: TWO_HOUR_TOKEN
		}
	})

	if (!fs.existsSync(".env")) {
		fs.writeFileSync(".env", fs.readFileSync(".env.sample", "utf-8"), "utf-8")
	}

	let env = fs.readFileSync(".env", "utf-8")
	let splitEnv = env.split("\n")
	if (env.includes("FB_TOKEN=")) {
		for (let e in splitEnv) {
			let _env = splitEnv[e]
			if (_env.startsWith("FB_TOKEN=")) {
				splitEnv[e] = splitEnv[e].substring(0, "FB_TOKEN=".length)
				splitEnv[e] += data.access_token
			}
			if (_env.startsWith("SHORT_TERM_TOKEN=")) {
				splitEnv[e] = "SHORT_TERM_TOKEN="
			}
		}
		env = splitEnv.join("\n")
	} else {
		env += `\nFB_TOKEN=${data.access_token}`
	}

	fs.writeFileSync(".env", env, "utf-8")

	console.info("The .env file is now updated, we remove the value for SHORT_TERM_TOKEN as it is required to remove")
}
