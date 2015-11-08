import React, {Component} from 'react';
import Thread from '../components/thread';
import EventEmitter from 'eventemitter3';
import qwest from 'qwest';

const eventSource = new EventEmitter();
const messages = [];
const users = [];

function randomIndex(arr) {
	return Math.floor(Math.random() * arr.length);
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
			time: new Date(), // TODO generate timeline
		};
		messages.push(msg);
		eventSource.emit('message', msg);
	});
}

const run = () => {
	setInterval(fetchQuote, 1000);
};

// load random users from uifaces.com
const maxUsers = 10;

function fetchUser() {
	qwest.get('/uiface/random').then((xhr, response) => {
		users.push(response);
		if (users.length === maxUsers) {
			run();
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
