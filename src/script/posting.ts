import axios from "axios"
import { FacebookPostingProperties } from "../interface"
import uploadMedia from "./upload-media"

export default function FacebookPosting(TOKEN: string, PAGE_ID: string) {
	return async (message: FacebookPostingProperties | string, callback?: Function) => {
		try {
			const url = `https://graph.facebook.com/${PAGE_ID}/feed`

			if (typeof message === "string") {
				await axios.post(url, null, {
					params: {
						message: message,
						access_token: TOKEN
					}
				}).then(response => {
					if (callback) {
						if (typeof callback === 'function') {
							callback(null, response.data)
						}
					}
				}).catch(error => {
					if (callback) {
						if (typeof callback === "function") {
							callback(error, null)
							return
						}
					}
					throw new Error(error)
				})

				return
			}

			// TODO: Multi Media
			let attachments = []
			let imgError = false

			attachments = await Promise.all(
				(message.media || []).map(media => uploadMedia(TOKEN, media, message.message, PAGE_ID))
			)

			if (imgError) {
				throw new Error(`Image Posting error catcher`)
			}

			axios.post(url, null, {
				params: {
					message: message.message,
					attached_media: attachments,
					access_token: TOKEN
				}
			}).then(response => {
				if (callback) {
					if (typeof callback === 'function') {
						callback(null, response.data)
					}
				}
			}).catch(error => {
				if (callback) {
					if (typeof callback === "function") {
						callback(error, null)
						return
					}
				}
				throw new Error(error)
			})
		} catch (e) {
			console.error(e.toString())
			console.error(e?.error as string)
		}
	}
}

