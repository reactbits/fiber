import _ from 'lodash';
import React, { Component } from 'react';
import {
  Row,
  Col,
  Panel,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import { connect, Provider } from 'react-redux';
import {
  ThreadList,
  ThreadForm,
  ChannelList,
  UserList,
  UserMenu,
  Spinner,
  ContextMenuItem,
} from '../components';
import { loaderTypes } from '../components/common/spinner';
import DevTools from './devtools';
import store from './store';
import { actions } from './state';
import {
  selectThread,
  fetchMessageUser,
  onAction,
  canExecute,
  sendMessage,
  updateMessage,
  createThread,
} from './actions';
import style from './style.scss';

class App extends Component {
  state = {
    theme: 'github',
  };

  render() {
    const props = this.props;
    const { dispatch, currentUser } = props;
    const channelListProps = {
      channels: props.channels,
      selectedChannel: props.selectedChannel,
      selectChannel: (cn) => dispatch(actions.selectChannel(cn)),
      createChannel: (cn) => dispatch(actions.addChannel(cn)),
      removeChannel: (cn) => dispatch(actions.removeChannel(cn.id)),
    };
    const threadListProps = {
      threads: props.threads,
      onSelect: selectThread,
      avatarSize: 40,
      fetchUser: fetchMessageUser,
      onAction,
      canExecute,
      sendMessage,
      updateMessage,
      theme: this.state.theme,
    };
    const spinners = loaderTypes.map(t => <Spinner key={t} type={t} />);

    const makeThemeItem = (theme, label) => {
      const itemProps = {
        active: this.state.theme === theme,
        onSelect: () => this.setState({ theme }),
      };
      return <MenuItem {...itemProps}>{label}</MenuItem>;
    };

    const logout = () => {
      console.log('logout');
    };

    return (
      <div className="app container">
        <Row>
          <Col md={4}>
            <Panel>
              <UserMenu user={currentUser}>
                <ContextMenuItem header>You</ContextMenuItem>
                <ContextMenuItem onClick={logout}>Preferences</ContextMenuItem>
                <ContextMenuItem onClick={logout}>Logout</ContextMenuItem>
              </UserMenu>
              <ChannelList {...channelListProps} />
              <UserList users={props.users} />
            </Panel>
          </Col>
          <Col md={8}>
            <Panel>
              <ButtonToolbar>
                <DropdownButton id="theme-dropdown" bsStyle="default" title="Theme">
                  {makeThemeItem('plain', 'Plain')}
                  {makeThemeItem('github', 'GitHub')}
                </DropdownButton>
              </ButtonToolbar>
              <ThreadForm submit={createThread} />
              <ThreadList {...threadListProps} />
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className={style.loaders}>{spinners}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

const AppConnected = connect(_.identity)(App);

export default function Root(props) {
  return (
    <Provider store={store}>
      <div>
        <AppConnected {...props} />
        <DevTools />
      </div>
    </Provider>
  );
}
