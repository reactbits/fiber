import React from 'react';
import {
	ThreadList,
	ThreadForm,
	ChannelList,
	UserList,
	Spinner,
} from '../components';
import { loaderTypes } from '../components/common/spinner';
import { Row, Col, Panel } from 'react-bootstrap';
import { connect, Provider } from 'react-redux';
import DevTools from './devtools';
import store from './store';
import * as actions from './state';
import {
	selectThread,
	fetchMessageUser,
	onAction,
	canExecute,
	sendMessage,
	updateMessage,
	createThread,
} from './actions';
import _ from 'lodash';
import style from './style';

const Body = (props) => {
	const { dispatch } = props;
	const channelListProps = {
		channels: props.channels,
		selectedChannel: props.selectedChannel,
		selectChannel: (cn) => dispatch(actions.selectChannel(cn)),
		createChannel: (cn) => dispatch(actions.addChannel(cn)),
	};
	const threadListProps = {
		threads: props.threads,
		onSelect: selectThread,
		avatarSize: 40,
		fetchUser: fetchMessageUser,
		onAction,
		canExecute,
		sendMessage,
		updateMessage,
	};
	const spinners = loaderTypes.map(t => {
		return <Spinner key={t} type={t}/>;
	});
	return (
		<div className="app container">
			<Row>
				<Col md={4}>
					<Panel>
						<ChannelList {...channelListProps}/>
						<UserList users={props.users}/>
					</Panel>
				</Col>
				<Col md={8}>
					<Panel>
						<ThreadForm submit={createThread}/>
						<ThreadList {...threadListProps}/>
					</Panel>
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<div className={style.loaders}>{spinners}</div>
				</Col>
			</Row>
		</div>
	);
};

const App = connect(_.identity)(Body);

export default (props) => {
	return (
		<Provider store={store}>
			<div>
				<App {...props}/>
				<DevTools/>
			</div>
		</Provider>
	);
};
