import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import Channel from './channel';
import newChannelDialog from './addchannel';
import style from './style.scss';
import { NavSection, NavBody, NavHeader, NavHeaderButtons, PlusButton } from '../common';

export function ChannelList(props) {
	const className = classNames(props.className, style.channel_list);
	const selectedId = (props.selectedChannel || {}).id;
	const channels = props.channels.map((cn, i) => {
		const cnprops = {
			key: cn.id || i,
			data: cn,
			selected: cn.id === selectedId,
			select: props.selectChannel,
			remove: _.isFunction(props.removeChannel) ? props.removeChannel.bind(null, cn) : undefined,
			to: cn.id && props.basePath ? `${props.basePath}/${cn.id}` : undefined,
		};
		return <Channel {...cnprops} />;
	});
	const onPlusClick = () => {
		newChannelDialog(props.createChannel);
	};
	return (
		<NavSection className={className}>
			<NavHeader title="CHANNELS">
				<NavHeaderButtons>
					<PlusButton tip="Create new channel" onClick={onPlusClick} />
				</NavHeaderButtons>
			</NavHeader>
			<NavBody>
				{channels}
			</NavBody>
		</NavSection>
	);
}

export default ChannelList;
