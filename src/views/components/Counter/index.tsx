import React from 'react'
import { connect } from 'react-redux'
import { IState } from '../../../state/IState'
import { Actions } from '../../../state/rootReducer'

interface IStateProps {
	clickCount: number
}

interface IDispatchProps {
	click: () => void
	unclick: () => void
}

type IProps = IStateProps & IDispatchProps

const Button = (props: IProps) => {
	return (
		<>
			<div>{props.clickCount}</div>
			<div>
				<button onClick={props.click}>Click</button>
				<button onClick={props.unclick}>Unclick</button>
			</div>
		</>
	)
}

export default connect(
	(s: IState): IStateProps => ({
		clickCount: s.clickCount,
	}),
	Actions,
)(Button)
