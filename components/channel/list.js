import React from 'react';
import classNames from 'classnames';
import Channel from './channel';
import AddChannel from './addchannel';
import style from './style';
import { NavSection, NavBody, NavHeader, NavHeaderButtons, PlusButton } from '../common';

export const ChannelList = (props) => {
	const className = classNames(props.className, style.channel_list);
	const selectedId = (props.selectedChannel || {}).id;
	const channels = props.channels.map((cn, i) => {
		const cnprops = {
			key: cn.id || i,
			data: cn,
			selected: cn.id === selectedId,
			select: props.selectChannel,
			to: cn.id && props.basePath ? `${props.basePath}/${cn.id}` : undefined,
		};
		return <Channel {...cnprops} />;
	});
	return (
		<NavSection className={className}>
			<NavHeader title="CHANNELS">
				<NavHeaderButtons>
					<PlusButton tip="Create new channel" />
				</NavHeaderButtons>
			</NavHeader>
			<NavBody>
				{channels}
			</NavBody>
			<AddChannel createChannel={props.createChannel} />
		</NavSection>
	);
};

export default ChannelList;
