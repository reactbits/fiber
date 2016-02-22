import React from 'react';
import classNames from 'classnames';
import Channel from './channel';
import AddChannel from './addchannel';
import style from './style';

export const ChannelList = (props) => {
	const className = classNames(props.className, style.channel_list);
	const selectedId = (props.selectedChannel || {}).id;
	const channels = props.channels.map(cn => {
		const cnprops = {
			key: cn.id,
			data: cn,
			selected: cn.id === selectedId,
			select: props.selectChannel,
		};
		return <Channel {...cnprops} />;
	});
	return (
		<div className={className}>
			<div className="header">
				<span>Channels</span>
			</div>
			<div className="body">
				{channels}
			</div>
			<AddChannel createChannel={props.createChannel} />
		</div>
	);
};

export default ChannelList;
