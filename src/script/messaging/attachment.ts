import axios from "axios";
import * as fs from "fs";
import { DefaulProperties, MessengerConfigProperties } from "../../interface";

export default function attachment(TOKEN: string, config: MessengerConfigProperties) {
	return async (fileType: string, fileUrl: string, event: DefaulProperties, callback?: Function) => {
		if (!TOKEN) {
			if (typeof callback === "function") {
				return callback("ERR: Undefined TOKEN", null);
			}
			return console.error(`TOKEN [ERR]: Undefined TOKEN`);
		}

		if (typeof event !== "object") {
			if (typeof callback === "function") {
				return callback("ERR: The event must be an Object or JSON type", null);
			}
			return console.error(
				"ERROR [event type]: The event must be in Object or JSON type",
			);
		}

		let info = {
			recipient: {
				id: event.sender.id,
			},
			message: {
				attachment: {
					type: fileType,
					payload: {
						url: fileUrl,
						is_reusable: true,
					},
				},
			},
		};

		let url = "messages";

		if (!fileUrl) {
			if (typeof callback === "function") {
				return callback("ERR: Undefined File URL", null);
			}
			console.error("Undefined File URL");
			return;
		}

		if (!fileUrl.startsWith("http")) {
			// TODO: Trigger the condition for local storage such as temp and assets
			if (!fileUrl.startsWith("/")) {
				fileUrl = `/${fileUrl}`;
			}

			if (!fs.existsSync(fileUrl)) {
				if (typeof callback === "function") {
					return callback("ERR: File doesn't exists", null);
				}
				console.error("File doesn't exists");
				return;
			}

			const hostname = config.hostname || "localhost";
			const assets = config.assets || "/assets";
			const temp = config.temp || "/temp";

			let file = fileUrl.split(`${assets.substring(1)}/`)[1];
			let folder = assets.substring(1);

			if (
				fileUrl.includes(temp) &&
				!fileUrl.includes(assets.substring(1))
			) {
				file = fileUrl.split(`${temp.substring(1)}/`)[1];
				folder = "temp";
			}

			info.message.attachment.payload.url = `https://${hostname}/${folder}/${file}`;
		}

		axios
			.post(
				`https://graph.facebook.com/${config.version}/me/${url}?access_token=${TOKEN}`,
				info,
				{
					headers: {
						Authorization: `Bearer ${TOKEN}`,
						"Content-Type": "application/json",
					},
				},
			)
			.then((response) => {
				if (callback) {
					if (typeof callback === "function") {
						callback(null, response.data);
					}
				}
			})
			.catch((error) => {
				if (callback) {
					if (typeof callback === "function") {
						callback(error, null);
					}
				}
			});
	}
}


