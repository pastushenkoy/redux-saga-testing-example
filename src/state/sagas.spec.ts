import { processClick } from '../state/sagas'
import { expectSaga } from 'redux-saga-test-plan'
import { call } from 'redux-saga/effects'
import { ServerApi } from '../api/ServerApi'
import { StaticProvider } from 'redux-saga-test-plan/providers'
import rootReducer, { Actions } from './rootReducer'
import { IState } from './IState'

describe('When click', () => {
	it('should increment click counter (behaviour test)', () => {
		const saga = processClick()

		const call = saga.next()

		const put = saga.next(10)

		const res = saga.next()

		expect((put.value.payload as any).action.payload).toBe(10)
	})

	it('should incremet click counter (behaviour test with test-plan)', () => {
		const callToSendBrilliantClickReturns1: StaticProvider = [call(ServerApi.SendClick), 2]

		return expectSaga(processClick)
			.provide([callToSendBrilliantClickReturns1])

			.dispatch(Actions.click())

			.call(ServerApi.SendClick)
			.put(Actions.clickSuccess(2))

			.run()
	})

	it('should incremet click counter (state test with test-plan)', () => {
		const callToSendClickReturns1: StaticProvider = [call(ServerApi.SendClick), 14]

		const initialState: IState = {
			clickCount: 11,
		}

		return expectSaga(processClick)
			.provide([callToSendClickReturns1])
			.withReducer(rootReducer, initialState)

			.dispatch(Actions.click())

			.silentRun()
			.then(result => expect(result.storeState.clickCount).toBe(14))
	})

	it('should incremet click counter (state test with test-plan async-way)', async () => {
		const callToSendClickReturns1: StaticProvider = [call(ServerApi.SendClick), 14]
		const initialState: IState = {
			clickCount: 11,
		}
		const saga = expectSaga(processClick)
			.provide([callToSendClickReturns1])
			.withReducer(rootReducer, initialState)

		const result = await saga.dispatch(Actions.click()).silentRun()

		expect(result.storeState.clickCount).toBe(14)
	})
})
