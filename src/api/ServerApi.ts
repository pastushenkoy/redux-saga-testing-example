import 'babel-polyfill'

let clickCount = 0

export const ServerApi = {
	SendClick: (): Promise<number> => {
		return Promise.resolve(++clickCount)
	},

	SendUnclick: (): Promise<number> => {
		return Promise.resolve(--clickCount)
	},
}
