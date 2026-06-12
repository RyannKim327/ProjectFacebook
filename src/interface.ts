export interface FacebookPostingProperties {
	message: string,
	media?: FacebookMediaProperties[]
}

export interface FacebookMediaProperties {
	url: string
	caption?: string
}

export interface MessagingProperties {
	hostname?: string
	token: string
	temp?: string
	assets?: string
}

export interface MessengerConfigProperties {
	assets?: string
	temp?: string
	hostname?: string
	version: string
}

export type DefaulProperties = Record<string, any>
