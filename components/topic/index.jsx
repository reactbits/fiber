import Avatar from '../avatar';
import style from './style';

const Topic = (props) => {
	// TODO render title, short message, time, badges e.g. number of unread messages
	const user = props.user;
	return (
		<div className={`topic ${style.topic}`}>
			{user && user.avatar ? <Avatar source={user.avatar} size={props.avatarSize} name={user.name}/> : null}
		</div>
	);
};

const TopicList = (props) => {
	const items = props.items.map(t => {
		return <Topic {...t}/>;
	});
	return (
		<div className={`topic_list ${style.topic_list}`}
			{items}
		</div>
	);
};

export default Topic;
export {Topic, TopicList};
