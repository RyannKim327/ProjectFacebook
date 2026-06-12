import axios from "axios";
import { DefaulProperties, MessengerConfigProperties } from "../../interface";

export default function message(TOKEN: string, config: MessengerConfigProperties) {
	const _sendMessage = async (text: string, event: DefaulProperties, callback?: Function) => {
		if (!TOKEN) {
			if (typeof callback === "function") {
				return callback("ERR: Undefined TOKEN", null);
			}
			return console.error(`Error: undefined TOKEN`);
		}
		if (typeof text !== "string") {
			if (typeof callback === "function") {
				return callback("ERR: Text must be string", null);
			}
			return console.error(`Error: text must be string`);
		}
		try {
			const response = await axios.post(
				`https://graph.facebook.com/${config.version}/me/messages?access_token=${TOKEN}`,
				{
					message: { text: text },
					recipient: {
						id: event.sender.id,
					},
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (typeof callback === "function") {
				callback(null, response.data);
			}
			return response;
		} catch (error) {
			if (typeof callback === "function") {
				callback(error, null);
			}
			throw error;
		}
	};

	return async (message: string | any, event: DefaulProperties, callback?: Function) => {
		if (!TOKEN) {
			if (typeof callback === "function") {
				return callback("ERR: Undefined TOKEN", null);
			}
			return console.error(`Token [ERR]: Undefined TOKEN`);
		}

		if (typeof event !== "object") {
			if (typeof callback === "function") {
				return callback("ERR: The event must be an Object or JSON type", null);
			}
			return console.error(
				"ERROR [event type]: The event must be an Object or JSON type",
			);
		}

		let msg = message;
		if (typeof message === "object") {
			if (message.text) {
				msg = message.text;
			}
		}

		if (typeof msg !== "string") {
			if (typeof callback === "function") {
				return callback("ERR: Text must be string", null);
			}
			return console.error(
				`Send Message [ERR]: Message must be in string format`,
			);
		}

		let msgs = msg.split(" ");
		if (msgs.length >= 300) {
			const words = 250;
			let m = 0;
			const x = () => {
				if (m < Math.ceil(msgs.length / words)) {
					const msg_ = msgs.slice(m * words, (m + 1) * words);
					_sendMessage(msg_.join(" "), event, callback);
					m++;
					setTimeout(() => {
						x();
					}, 1500);
				}
			};
			x();
		} else {
			await _sendMessage(msg, event, callback);
		}
	}
}
