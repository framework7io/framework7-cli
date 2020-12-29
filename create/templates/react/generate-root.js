const indent = require('../../utils/indent');
const templateIf = require('../../utils/template-if');
const appParameters = require('../app-parameters');

module.exports = (options) => {
  const {
    template,
    type,
    theming,
    customBuild,
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
    <Panel left cover themeDark visibleBreakpoint={960}>
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
            <ListItem link="/about/" view=".view-main" panelClose title="About"/>
            <ListItem link="/form/" view=".view-main" panelClose title="Form"/>
            <ListItem link="#" view=".view-main" back panelClose title="Back in history"/>
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
  if (template === 'single-view' || template === 'split-view' || template === 'blank') {
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
          <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconAurora="f7:house_fill" iconMd="material:home" text="Home" />
          <Link tabLink="#view-catalog" iconIos="f7:square_list_fill" iconAurora="f7:square_list_fill" iconMd="material:view_list" text="Catalog" />
          <Link tabLink="#view-settings" iconIos="f7:gear" iconAurora="f7:gear" iconMd="material:settings" text="Settings" />
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
    import React, { useState, useEffect } from 'react';
    ${templateIf(type.indexOf('cordova') >= 0 || type.indexOf('capacitor') >= 0, () => `
    import { getDevice }  from '${customBuild ? '../js/framework7-custom.js' : 'framework7/lite-bundle'}';
    `)}
    ${template === 'blank' ? `
    import {
      App,
      View,
    } from 'framework7-react';
    `.trim() : `
    import {
      f7,
      f7ready,
      App,
      Panel,
      Views,
      View,
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
    `.trim()}
    ${templateIf(type.indexOf('cordova') >= 0, () => `
    import cordovaApp from '../js/cordova-app';
    `)}
    ${templateIf(type.indexOf('capacitor') >= 0, () => `
    import capacitorApp from '../js/capacitor-app';
    `)}
    import routes from '../js/routes';
    import store from '../js/store';

    const MyApp = () => {
      ${templateIf(template !== 'blank', () => `
      // Login screen demo data
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      `)}
      ${templateIf(type.indexOf('cordova') >= 0 || type.indexOf('capacitor') >= 0, () => `
      const device = getDevice();
      `)}
      // Framework7 Parameters
      const f7params = {
        ${indent(10, appParameters(options)).trim()}
      };
      ${templateIf(template !== 'blank', () => `
      const alertLoginData = () => {
        f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
          f7.loginScreen.close();
        });
      }
      `)}
      f7ready(() => {
        ${templateIf(type.indexOf('cordova') >= 0, () => `
        // Init cordova APIs (see cordova-app.js)
        if (f7.device.cordova) {
          cordovaApp.init(f7);
        }
        `.trim())}
        ${templateIf(type.indexOf('capacitor') >= 0, () => `
        // Init capacitor APIs (see capacitor-app.js)
        if (f7.device.capacitor) {
          capacitorApp.init(f7);
        }
        `.trim())}
        // Call F7 APIs here
      });

      ${template === 'blank' ? `
      return (
        <App { ...f7params } ${theming.darkTheme ? 'themeDark' : ''}>
          ${views}
        </App>
      );
      `.trim() : `
      return (
        <App { ...f7params } ${theming.darkTheme ? 'themeDark' : ''}>
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
                    value={username}
                    onInput={(e) => setUsername(e.target.value)}
                  ></ListInput>
                  <ListInput
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                  ></ListInput>
                </List>
                <List>
                  <ListButton title="Sign In" onClick={() => alertLoginData()} />
                  <BlockFooter>
                    Some text about login information.<br />Click "Sign In" to close Login Screen
                  </BlockFooter>
                </List>
              </Page>
            </View>
          </LoginScreen>
        </App>
      )
      `.trim()}
    }
    export default MyApp;
  `).trim();
};
