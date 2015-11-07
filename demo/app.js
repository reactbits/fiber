import React, {Component} from 'react';
import {Thread} from '../components';
import EventEmitter from 'eventemitter3';
import qwest from 'qwest';

const eventSource = new EventEmitter();
let messages = [];
let users = [];

// load random users from uifaces.com
const maxUsers = 10;

function fetchUser() {
	qwest.get('/uiface/random').then((xhr, response) => {
		users.push(response);
		if (users.length == maxUsers) {
			run();
		}
	});
}

for (let i = 0; i < maxUsers; i++) {
	fetchUser();
}

// TODO support multiple sources
const source = 'http://api.icndb.com/jokes/random';

function fetchQuote() {
	qwest.get(source).then((xhr, response) => {
		const body = response.body;
		const content = body.value;
		const msg = {
			body: content,
			avatar: '',
			name: 'cat', // TODO generate name,
			time: '10:35 PM', // TODO generate timeline
		};
		messages.push(msg);
		eventSource.fire('message', msg);
	});
}

const run = () => {
	setInterval(fetchQuote, 1000);
};

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: messages
		};
	}

	render() {
		// TODO render threads pane (e.g. for different quote sources)
		const messages = this.state.messages || [];
		return (
			<div className="app">
				<Thread topic="THE INTERNET CHUCK NORRIS DATABASE" messages={messages}/>
			</div>
		);
	}

	componentDidMount() {
		eventSource.on('message', this.handleMessage);
	}

	componentWillUnmount() {
		eventSource.off('message', this.handleMessage);
	}

	handleMessage() {
		this.setState({messages: messages});
	}
}
