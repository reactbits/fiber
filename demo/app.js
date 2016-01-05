import React from 'react';
import { ThreadList, ChannelList } from '../components';
import { Row, Col, Panel } from 'react-bootstrap';
import { connect, Provider } from 'react-redux';
import DevTools from './devtools';
import store from './store';
import { users, nextDate } from './state';
import * as actions from './state';
import qwest from 'qwest';
import _ from 'lodash';

function randomIndex(arr) {
	return Math.floor(Math.random() * arr.length);
}

function rnd(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TODO support multiple sources
const source = '/jokes/random';
let nextId = 1;

function makeMessage() {
	return qwest.get(source).then((xhr, response) => {
		const data = response.value;
		const i = randomIndex(users);
		const user = users[i];
		const msg = {
			id: nextId++,
			body: data.joke,
			user_id: i,
			time: nextDate(nextId - 1),
			likes: rnd(0, 10),
		};
		if ((nextId & 1) === 0) {
			msg.user = user;
		}
		return msg;
	});
}

function fetchMessageUser(msg) {
	const user = users[msg.user_id];
	return new Promise((resolve) => {
		return setTimeout(() => resolve(user), 100);
	});
}

function pushMessage(msg) {
	store.dispatch(actions.addMessage(msg));
	if (nextId < 25) {
		setTimeout(fetchQuote, 1000);
	}
}

function fetchQuote() {
	makeMessage().then((msg) => {
		const n = rnd(0, 3);
		if (n > 0) {
			// TODO async loading of replies
			return Promise.all(_.range(n).map(makeMessage)).then((replies) => {
				pushMessage({ ...msg, replies });
			});
		}
		pushMessage(msg);
	});
}

// load random users from uifaces.com
const maxUsers = 10;

function fetchUser() {
	qwest.get('/randomuser').then((xhr, response) => {
		const user = response.results[0].user;
		const name = user.name.first + ' ' + user.name.last;
		users.push({
			name,
			avatar_url: 'https://robohash.org/' + name,
			// avatar_url: user.picture.large,
		});
		if (users.length >= maxUsers) {
			fetchQuote();
		}
	});
}

for (let i = 0; i < maxUsers; i++) {
	fetchUser();
}

const onAction = (type, id) => {
	swal(`action ${type} on message ${id}`);
};

const selectThread = (thread) => {
	swal(`selected ${thread.topic}`);
};

function sendMessage(msg) {
	swal(`thread: ${msg.threadId}, body: ${msg.body}`);
}

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
		avatarSize: 64,
		fetchUser: fetchMessageUser,
		onAction,
		sendMessage,
	};
	return (
		<div className="app container">
			<Row>
				<Col md={4}>
					<Panel header="Channels">
						<ChannelList {...channelListProps}/>
					</Panel>
				</Col>
				<Col md={8}>
					<Panel header="Threads">
						<ThreadList {...threadListProps}/>
					</Panel>
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
