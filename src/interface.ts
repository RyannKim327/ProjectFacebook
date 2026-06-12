export interface FacebookPostingProperties {
	message: string,
	media?: FacebookMediaProperties[]
}

export interface FacebookMediaProperties {
	url: string
	caption?: string
}
