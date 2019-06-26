import { IState } from './IState'

export enum ActionTypes {
	BRILLIANT_CLICK = 'BRILLIANT_CLICK',
	BRILLIANT_CLICK_SUCCESS = 'BRILLIANT_CLICK_SUCCESS',
}

export interface BrilliantClickAction {
	type: ActionTypes.BRILLIANT_CLICK
}

export interface BrilliantClickSuccessAction {
	type: ActionTypes.BRILLIANT_CLICK_SUCCESS
	payload: number
}

export const Actions = {
	click: (): BrilliantClickAction => ({ type: ActionTypes.BRILLIANT_CLICK }),
	clickSuccess: (clicksCount: number): BrilliantClickSuccessAction => ({
		type: ActionTypes.BRILLIANT_CLICK_SUCCESS,
		payload: clicksCount,
	}),
}

const initialState: IState = {
	clickCount: 0,
}

export default function rootReducer(state: IState = initialState, action: any) {
	if (action.type === ActionTypes.BRILLIANT_CLICK_SUCCESS) {
		return { ...state, clickCount: action.payload }
	}

	return state
}
