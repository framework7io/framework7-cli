const indent = require('../../utils/indent');
const templateIf = require('../../utils/template-if');
const appParameters = require('../app-parameters');

module.exports = (options) => {
  const {
    template,
    type,
  } = options;

  // Panels
  const leftPanelPlain = indent(12, `
    {/* Left panel with cover effect*/}
    <Panel left cover themeDark>
      <View>
        <Page>
          <Navbar title="Left Panel"/>
          <Block>Left panel content goes here</Block>
        </Page>
      </View>
    </Panel>
  `);

  const leftPanelWithView = indent(12, `
    {/* Left panel with cover effect when hidden */}
    <Panel left cover themeDark>
      <View>
        <Page>
          <Navbar title="Left Panel"/>
          <BlockTitle>Left View Navigation</BlockTitle>
          <List>
            <ListItem link="/left-page-1/" title="Left Page 1"/>
            <ListItem link="/left-page-2/" title="Left Page 2"/>
          </List>
          <BlockTitle>Control Main View</BlockTitle>
          <List>
            <ListItem link="/about/" view=".view-main" panel-close title="About"/>
            <ListItem link="/form/" view=".view-main" panel-close title="Form"/>
            <ListItem link="#" view=".view-main" back panel-close title="Back in history"/>
          </List>
        </Page>
      </View>
    </Panel>
  `);
  const leftPanel = template === 'split-view' ? leftPanelWithView : leftPanelPlain;
  const rightPanel = indent(12, `
    {/* Right panel with reveal effect*/}
    <Panel right reveal themeDark>
      <View>
        <Page>
          <Navbar title="Right Panel"/>
          <Block>Right panel content goes here</Block>
        </Page>
      </View>
    </Panel>
  `);

  // Views
  let views = '';
  if (template === 'single-view' || template === 'split-view') {
    views = indent(12, `
      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />
    `);
  }
  if (template === 'tabs') {
    views = indent(12, `
      {/* Views/Tabs container */}
      <Views tabs className="safe-areas">
        {/* Tabbar for switching views-tabs */}
        <Toolbar tabbar labels bottom>
          <Link tabLink="#view-home" tabLinkActive iconIos="f7:home_fil" iconAurora="f7:home_fil" iconMd="material:home" text="Home" />
          <Link tabLink="#view-catalog" iconIos="f7:list_fill" iconAurora="f7:list_fill" iconMd="material:view_list" text="Catalog" />
          <Link tabLink="#view-settings" iconIos="f7:settings_fill" iconAurora="f7:settings_fill" iconMd="material:settings" text="Settings" />
        </Toolbar>

        {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
        <View id="view-home" main tab tabActive url="/" />

        {/* Catalog View */}
        <View id="view-catalog" name="catalog" tab url="/catalog/" />

        {/* Settings View */}
        <View id="view-settings" name="settings" tab url="/settings/" />

      </Views>
    `);
  }

  return indent(0, `
    import React from 'react';
    import {
      App,
      Panel,
      Views,
      View,
      Statusbar,
      Popup,
      Page,
      Navbar,
      Toolbar,
      NavRight,
      Link,
      Block,
      BlockTitle,
      LoginScreen,
      LoginScreenTitle,
      List,
      ListItem,
      ListInput,
      ListButton,
      BlockFooter
    } from 'framework7-react';

    ${templateIf(type.indexOf('cordova') >= 0, () => `
    import cordovaApp from '../js/cordova-app';
    `)}
    import routes from '../js/routes';

    export default class extends React.Component {
      constructor() {
        super();

        this.state = {
          // Framework7 Parameters
          f7params: {
            ${indent(12, appParameters(options)).trim()}
          },
          // Login screen demo data
          username: '',
          password: '',
        }
      }
      render() {
        return (
          <App params={ this.state.f7params }>
            {/* Status bar overlay for fullscreen mode*/}
            <Statusbar></Statusbar>
            ${leftPanel}
            ${rightPanel}
            ${views}

            {/* Popup */}
            <Popup id="my-popup">
              <View>
                <Page>
                  <Navbar title="Popup">
                    <NavRight>
                      <Link popupClose>Close</Link>
                    </NavRight>
                  </Navbar>
                  <Block>
                    <p>Popup content goes here.</p>
                  </Block>
                </Page>
              </View>
            </Popup>

            <LoginScreen id="my-login-screen">
              <View>
                <Page loginScreen>
                  <LoginScreenTitle>Login</LoginScreenTitle>
                  <List form>
                    <ListInput
                      type="text"
                      name="username"
                      placeholder="Your username"
                      value={this.state.username}
                      onInput={(e) => this.setState({username: e.target.value})}
                    ></ListInput>
                    <ListInput
                      type="password"
                      name="password"
                      placeholder="Your password"
                      value={this.state.password}
                      onInput={(e) => this.setState({password: e.target.value})}
                    ></ListInput>
                  </List>
                  <List>
                    <ListButton title="Sign In" loginScreenClose onClick={() => this.alertLoginData()} />
                    <BlockFooter>
                      Some text about login information.<br />Click "Sign In" to close Login Screen
                    </BlockFooter>
                  </List>
                </Page>
              </View>
            </LoginScreen>
          </App>
        )
      }
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.state.username + '<br>Password: ' + this.state.password);
      }
      componentDidMount() {
        this.$f7ready((f7) => {
          ${templateIf(type.indexOf('cordova') >= 0, () => `
          // Init cordova APIs (see cordova-app.js)
          if (f7.device.cordova) {
            cordovaApp.init(f7);
          }
          `)}
          // Call F7 APIs here
        });
      }
    }
  `).trim();
};
