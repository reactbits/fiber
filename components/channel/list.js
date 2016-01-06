import React from 'react';
import classNames from 'classnames';
import Channel from './channel';
import AddChannel from './addchannel';
import style from './style';

export const ChannelList = (props) => {
	const className = classNames({
		'channel-list': true,
		[style.channel_list]: true,
	});
	const selectedId = (props.selectedChannel || {}).id;
	const channels = props.channels.map(cn => {
		return (
			<Channel key={cn.id} data={cn} selected={cn.id === selectedId} select={props.selectChannel}/>
		);
	});
	return (
		<div className={className}>
			<div className="header">
				<span>Channels</span>
			</div>
			<div className="body">
				{channels}
			</div>
			<AddChannel createChannel={props.createChannel}/>
		</div>
	);
};

export default ChannelList;
