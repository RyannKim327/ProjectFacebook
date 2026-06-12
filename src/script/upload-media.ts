import axios from "axios";
import { FacebookMediaProperties } from "../interface";

export default async function uploadMedia(TOKEN: string, media: FacebookMediaProperties, msg: string, pageId: string) {
	const { data } = await axios.post(`https://graph.facebook.com/${pageId}/photos`, null, {
		params: {
			url: media.url,
			caption: media.caption ?? msg,
			published: false,
			access_token: TOKEN
		}
	})

	return {
		media_fbid: data.id
	}
}
