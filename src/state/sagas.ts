import { call, takeEvery, put, all } from 'redux-saga/effects'
import { ServerApi } from '../api/ServerApi'
import { ActionTypes, Actions } from './rootReducer'

export function* processClick() {
	const result = yield call(ServerApi.SendClick)
	yield put(Actions.clickSuccess(result))
}

export function* processUnclick() {
	const result = yield call(ServerApi.SendUnclick)
	yield put(Actions.clickSuccess(result))
}

function* watchClick() {
	yield takeEvery(ActionTypes.CLICK, processClick)
}

function* watchUnclick() {
	yield takeEvery(ActionTypes.UNCLICK, processUnclick)
}

export default function* mainSaga() {
	yield all([watchClick(), watchUnclick()])
}
