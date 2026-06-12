import axios from "axios"

export default function TwoHourToken(PAGE_ACCESS_TOKEN: string) {
	let trial = 10
	const callToken = async () => {
		try {
			const url = "https://graph.facebook.com/v25.0/me/accounts"

			const { data } = await axios.get(url, {
				params: {
					access_token: PAGE_ACCESS_TOKEN,
					debug: "all",
					format: "json",
					method: "get",
					origin_graph_explorer: 1,
					pretty: 0,
					suppress_http_code: 1,
					transport: "cors"
				}
			})

			if (Array.isArray(data.data)) {
				return data.data[0].access_token
			} else {
				throw new Error(data)
			}

		} catch (e) {
			console.error(e.toString())
			trial--
			if (trial <= 0) {
				setTimeout(() => {
					console.log("Ten second timeout")
					trial = 10
					callToken()
				}, 10000)
			} else {
				callToken()
			}
		}
	}
	return callToken
}
