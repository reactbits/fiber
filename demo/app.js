import React from 'react';
import Thread from '../components/thread';
import {Row, Col, Panel} from 'react-bootstrap';
import {connect, Provider} from 'react-redux';
import store from './store';
import * as actions from './state';
import qwest from 'qwest';
import moment from 'moment';
import _ from 'lodash';

const users = [
	{
		name: 'sergeyt',
		avatar: 'stodyshev@gmail.com',
	},
	{
		name: 'sergeyt',
		avatar: 'https://robohash.org/sergeyt',
	},
	{
		name: 'noavatar',
		avatar: 'noavatar.png',
	},
];

function randomIndex(arr) {
	return Math.floor(Math.random() * arr.length);
}

function rnd(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const timeline = [
	// previous year
	moment().subtract(1, 'years').subtract(45, 'minutes').toDate(),
	moment().subtract(1, 'years').subtract(53, 'minutes').toDate(),
	// previous week
	moment().subtract(7, 'days').subtract(45, 'minutes').toDate(),
	moment().subtract(7, 'days').subtract(53, 'minutes').toDate(),
	// yesterday
	moment().subtract(2, 'days').subtract(45, 'minutes').toDate(),
	moment().subtract(2, 'days').subtract(53, 'minutes').toDate(),
	// today
	moment().subtract(1, 'days').subtract(32, 'minutes').toDate(),
	moment().subtract(1, 'days').subtract(42, 'minutes').toDate(),
];

function nextDate(i) {
	if (i < timeline.length) {
		return timeline[i];
	}
	return new Date();
}

// TODO support multiple sources
const source = '/jokes/random';
let nextId = 1;

function makeMessage() {
	return qwest.get(source).then((xhr, response) => {
		const data = response.value;
		const i = randomIndex(users);
		const user = users[i];
		return {
			id: nextId++,
			body: data.joke,
			name: user.name,
			avatar: user.avatar,
			time: nextDate(nextId - 1),
			likes: rnd(0, 10),
		};
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
				msg.replies = replies;
				pushMessage(msg);
			});
		}
		pushMessage(msg);
	});
}

// load random users from uifaces.com
const maxUsers = 10;

function fetchUser() {
	qwest.get('/uiface/random').then((xhr, response) => {
		users.push({
			name: response.username,
			avatar: 'https://robohash.org/' + response.username, // response.image_urls.epic,
		});
		if (users.length >= maxUsers) {
			fetchQuote();
		}
	});
}

for (let i = 0; i < maxUsers; i++) {
	fetchUser();
}

const Body = (props) => {
	// TODO render threads pane (e.g. for different quote sources)
	return (
		<div className="app container">
			<Row>
				<Col md={4}>
					<Panel header="Topics">
						<span>TODO list topics</span>
					</Panel>
				</Col>
				<Col md={8}>
					<Panel header="THE INTERNET CHUCK NORRIS DATABASE">
						<Thread messages={props.messages} avatarSize={64}/>
					</Panel>
				</Col>
			</Row>
		</div>
	);
};

const App = connect((state) => {
	return {
		messages: state.messages,
	};
})(Body);

export default (props) => {
	return (
		<Provider store={store}>
			<App {...props}/>
		</Provider>
	);
};
