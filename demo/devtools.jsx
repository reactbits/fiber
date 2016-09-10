import React from 'react';

import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const devToolsProps = {
  defaultPosition: 'left',
  defaultSize: 0.2,
  toggleVisibilityKey: 'ctrl-h',
  changePositionKey: 'ctrl-q',
};

export default createDevTools(
  <DockMonitor {...devToolsProps}>
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);
