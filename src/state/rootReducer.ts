import { IState } from './IState'

export enum ActionTypes {
	CLICK = 'CLICK',
	UNCLICK = 'UNCLICK',
	CLICK_UNCLICK_SUCCESS = 'CLICK_UNCLICK_SUCCESS',
}

export interface ClickAction {
	type: ActionTypes.CLICK
}

export interface UnclickAction {
	type: ActionTypes.UNCLICK
}

export interface ClickSuccessAction {
	type: ActionTypes.CLICK_UNCLICK_SUCCESS
	payload: number
}

export const Actions = {
	click: (): ClickAction => ({ type: ActionTypes.CLICK }),
	unclick: (): UnclickAction => ({ type: ActionTypes.UNCLICK }),
	clickSuccess: (clicksCount: number): ClickSuccessAction => ({
		type: ActionTypes.CLICK_UNCLICK_SUCCESS,
		payload: clicksCount,
	}),
}

const initialState: IState = {
	clickCount: 0,
}

export default function rootReducer(state: IState = initialState, action: any) {
	if (action.type === ActionTypes.CLICK_UNCLICK_SUCCESS) {
		return { ...state, clickCount: action.payload }
	}

	return state
}
