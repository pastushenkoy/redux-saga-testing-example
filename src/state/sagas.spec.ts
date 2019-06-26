import mainSaga, { processClick } from '../state/sagas'
import { expectSaga } from 'redux-saga-test-plan'
import { call } from 'redux-saga/effects'
import { ServerApi } from '../api/ServerApi'
import { StaticProvider } from 'redux-saga-test-plan/providers'
import rootReducer, { Actions } from './rootReducer'
import { IState } from './IState'

describe('When click', () => {
	expectSaga.DEFAULT_TIMEOUT = 50

	it('should increment click counter (behaviour test)', () => {
		const saga = processClick()

		const call = saga.next()

		const put = saga.next(10)

		expect((call.value.payload as any).fn).toBe(ServerApi.SendClick)
		expect((put.value.payload as any).action.payload).toBe(10)
	})

	it('should increment click counter (behaviour test with test-plan)', () => {
		const callToSendClickReturnsValue: StaticProvider = [call(ServerApi.SendClick), 2]

		return expectSaga(processClick)
			.provide([callToSendClickReturnsValue])

			.dispatch(Actions.click())

			.call(ServerApi.SendClick)
			.put(Actions.clickSuccess(2))

			.run()
	})

	it('should increment click counter (state test with test-plan)', () => {
		const callToSendClickReturnsValue: StaticProvider = [call(ServerApi.SendClick), 14]

		const initialState: IState = {
			clickCount: 11,
		}

		return expectSaga(processClick)
			.provide([callToSendClickReturnsValue])
			.withReducer(rootReducer, initialState)

			.dispatch(Actions.click())

			.run()
			.then(result => expect(result.storeState.clickCount).toBe(14))
	})

	it('should increment click counter (state test with test-plan async-way)', async () => {
		const callToSendClickReturnsValue: StaticProvider = [call(ServerApi.SendClick), 14]
		const initialState: IState = {
			clickCount: 11,
		}
		const saga = expectSaga(processClick)
			.provide([callToSendClickReturnsValue])
			.withReducer(rootReducer, initialState)

		const result = await saga.dispatch(Actions.click()).run()

		expect(result.storeState.clickCount).toBe(14)
	})

	it('should increment click counter (silent integration test)', async () => {
		const callToSendClickReturnsValue: StaticProvider = [call(ServerApi.SendClick), 14]
		const callToSendUnclickReturnsValue: StaticProvider = [call(ServerApi.SendUnclick), 18]
		const initialState: IState = {
			clickCount: 11,
		}

		const saga = expectSaga(mainSaga)
			.provide([callToSendClickReturnsValue, callToSendUnclickReturnsValue])
			.withReducer(rootReducer, initialState)

		const result = await saga
			.dispatch(Actions.click())
			.dispatch(Actions.unclick())
			.silentRun()

		expect(result.storeState.clickCount).toBe(18)
	})
})
