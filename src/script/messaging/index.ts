import attachment from "./attachment";
import message from "./message";
import { MessagingProperties } from "../../interface";

export default function FacebookMessaging(config: MessagingProperties) {
	const version = "v23.0"

	const messagingConfig = {
		version: version,
		assets: config.assets || "assets",
		temp: config.temp || "temp",
		hostname: config.hostname || "localhost"
	}

	const sendAttachment = attachment(config.token, messagingConfig)
	const sendMessage = message(config.token, messagingConfig)

	return {
		sendAttachment,
		sendMessage
	}
}
