declare namespace NodeJS {
	interface ProcessEnv {
		PAGE_ID: string,
		FB_TOKEN: string
		APP_ID?: string
		APP_SECRET?: string
		SHORT_TERM_TOKEN?: string
	}
}
