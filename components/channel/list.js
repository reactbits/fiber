import React from 'react';
import Channel from './channel';
import AddChannel from './addchannel';

export const ChannelList = (props) => {
	const selectedId = (props.selectedChannel || {}).id;
	const channels = props.channels.map(cn => {
		return (
			<Channel key={cn.id} data={cn} selected={cn.id === selectedId} select={props.selectChannel}/>
		);
	});
	return (
		<div className="channel-list">
			<div className="header">
				<span>Channels</span>
			</div>
			<div className="channels">
				{channels}
			</div>
			<AddChannel createChannel={props.createChannel}/>
		</div>
	);
};

export default ChannelList;
