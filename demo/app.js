import React, {Component} from 'react';
import Thread from '../components/thread';
import EventEmitter from 'eventemitter3';
import qwest from 'qwest';
import moment from 'moment';

const eventSource = new EventEmitter();
const messages = [];
const users = [
	{
		username: 'sergeyt',
		image_urls: {
			epic: 'stodyshev@gmail.com',
		},
	},
];

function randomIndex(arr) {
	return Math.floor(Math.random() * arr.length);
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

function nextDate() {
	const i = messages.length;
	if (i < timeline.length) {
		return timeline[i];
	}
	return new Date();
}

// TODO support multiple sources
const source = '/jokes/random';

function fetchQuote() {
	qwest.get(source).then((xhr, response) => {
		const data = response.value;
		const i = randomIndex(users);
		const msg = {
			id: messages.length + 1,
			body: data.joke,
			avatar: users[i].image_urls.epic,
			name: users[i].username,
			time: nextDate(),
		};
		messages.push(msg);
		eventSource.emit('message', msg);

		if (messages.length < 100) {
			setTimeout(fetchQuote, 1000);
		}
	});
}

// load random users from uifaces.com
const maxUsers = 10;

function fetchUser() {
	qwest.get('/uiface/random').then((xhr, response) => {
		users.push(response);
		if (users.length >= maxUsers) {
			fetchQuote();
		}
	});
}

for (let i = 0; i < maxUsers; i++) {
	fetchUser();
}

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: messages,
		};
	}

	componentDidMount() {
		eventSource.on('message', this.handleMessage.bind(this));
	}

	componentWillUnmount() {
		eventSource.off('message', this.handleMessage.bind(this));
	}

	handleMessage() {
		this.setState({messages: messages});
	}

	render() {
		// TODO render threads pane (e.g. for different quote sources)
		return (
			<div className="app">
				<Thread topic="THE INTERNET CHUCK NORRIS DATABASE" messages={this.state.messages}/>
			</div>
		);
	}
}
