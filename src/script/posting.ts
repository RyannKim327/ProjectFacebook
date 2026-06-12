import axios from "axios"
import { FacebookPostingProperties } from "../interface"

export default function FacebookPosting(TOKEN: string, PAGE_ID: string) {
	return async (message: FacebookPostingProperties) => {
		try {
			if (message.img) {
				const url = `https://graph.facebook.com/${PAGE_ID}/photos`
				const { data } = await axios.post(url, null, {
					params: {
						url: message.img,
						caption: message.message,
						access_token: TOKEN
					}
				})
				console.log("Photo Posted")
				return
			}
			const url = `https://graph.facebook.com/${PAGE_ID}/feed`
			const { data } = await axios.post(url, null, {
				params: {
					message: message.message,
					access_token: TOKEN
				}
			})
			console.log("Posted")
		} catch (e) {
			console.error(e)
			console.error(e?.error as string)
		}
	}
}

