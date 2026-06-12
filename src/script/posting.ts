import axios from "axios"
import { FacebookPostingProperties } from "../interface"
import uploadMedia from "./upload-media"

export default function FacebookPosting(TOKEN: string, PAGE_ID: string) {
	return async (message: FacebookPostingProperties) => {
		try {
			// TODO: Multi Media
			let attachments = []
			let imgError = false

			attachments = await Promise.all(
				(message.media || []).map(media => uploadMedia(TOKEN, media, message.message, PAGE_ID))
			)

			console.log(attachments)

			if (imgError) {
				throw new Error(`Image Posting error catcher`)
			}

			const url = `https://graph.facebook.com/${PAGE_ID}/feed`
			const { data } = await axios.post(url, null, {
				params: {
					message: message.message,
					attached_media: attachments,
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

