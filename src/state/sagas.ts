import { call, takeEvery, put } from 'redux-saga/effects'
import { ServerApi } from '../api/ServerApi'
import { ActionTypes, Actions } from './rootReducer'

export function* processClick() {
	const result = yield call(ServerApi.SendClick)
	yield put(Actions.clickSuccess(result))
}

export function* watchClick() {
	yield takeEvery(ActionTypes.BRILLIANT_CLICK, processClick)
}

