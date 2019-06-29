import mainSaga, { processClick } from '../state/sagas'
import { expectSaga } from 'redux-saga-test-plan'
import { call, put } from 'redux-saga/effects'
import { ServerApi } from '../api/ServerApi'
import rootReducer, { Actions } from './rootReducer'

describe('When click', () => {
	expectSaga.DEFAULT_TIMEOUT = 50

	it('should increment click counter (behaviour test)', () => {
		const saga = processClick()

		expect(saga.next().value).toEqual(call(ServerApi.SendClick))
		expect(saga.next(10).value).toEqual(put(Actions.clickSuccess(10)))
	})

	it('should increment click counter (behaviour test with test-plan)', () => {
		return expectSaga(processClick)
			.provide([
				[call(ServerApi.SendClick), 2]
			])

			.dispatch(Actions.click())

			.call(ServerApi.SendClick)
			.put(Actions.clickSuccess(2))

			.run()
	})

	it('should increment click counter (state test with test-plan)', () => {
		const initialState = {
			clickCount: 11,
		}

		return expectSaga(processClick)
			.provide([
				[call(ServerApi.SendClick), 14]
			])
			.withReducer(rootReducer, initialState)

			.dispatch(Actions.click())

			.run()
			.then(result => expect(result.storeState.clickCount).toBe(14))
	})

	it('should increment click counter (state test with test-plan async-way)', async () => {
		const initialState = {
			clickCount: 11,
		}

		const saga = expectSaga(processClick)
			.provide([
				[call(ServerApi.SendClick), 14]
			])
			.withReducer(rootReducer, initialState)

		const result = await saga.dispatch(Actions.click()).run()

		expect(result.storeState.clickCount).toBe(14)
	})

	it('should change click counter (silent integration test)', async () => {
		const initialState = {
			clickCount: 11,
		}

		const saga = expectSaga(mainSaga)
			.provide([
				[call(ServerApi.SendClick), 14], 
				[call(ServerApi.SendUnclick), 18]
			])
			.withReducer(rootReducer, initialState)

		const result = await saga
			.dispatch(Actions.click())
			.dispatch(Actions.unclick())
			.silentRun()

		expect(result.storeState.clickCount).toBe(18)
	})

	it('should change click counter (integration test)', async () => {
		const initialState = {
			clickCount: 11,
		}

		const saga = expectSaga(mainSaga)
			.provide([
				[call(ServerApi.SendClick), 14], 
				[call(ServerApi.SendUnclick), 18]
			])
			.withReducer(rootReducer, initialState)

		const result = await saga
			.dispatch(Actions.click())
			.dispatch(Actions.unclick())
			.run()

		expect(result.storeState.clickCount).toBe(18)
	})
})
