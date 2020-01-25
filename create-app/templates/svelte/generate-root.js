const indent = require('../../utils/indent');
const templateIf = require('../../utils/template-if');
const appParameters = require('../app-parameters');

module.exports = (options) => {
  const {
    template,
    type,
    theming,
  } = options;

  // Panels
  const leftPanelPlain = indent(6, `
    <!-- Left panel with cover effect-->
    <Panel left cover themeDark>
      <View>
        <Page>
          <Navbar title="Left Panel"/>
          <Block>Left panel content goes here</Block>
        </Page>
      </View>
    </Panel>
  `);

  const leftPanelWithView = indent(6, `
    <!-- Left panel with cover effect when hidden -->
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
            <ListItem link="/about/" view=".view-main" panel-close title="About"/>
            <ListItem link="/form/" view=".view-main" panel-close title="Form"/>
            <ListItem link="#" view=".view-main" back panel-close title="Back in history"/>
          </List>
        </Page>
      </View>
    </Panel>
  `);
  const leftPanel = template === 'split-view' ? leftPanelWithView : leftPanelPlain;
  const rightPanel = indent(6, `
    <!-- Right panel with reveal effect-->
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
    views = indent(6, `
      <!-- Your main view, should have "view-main" class -->
      <View main class="safe-areas" url="/" />
    `);
  }
  if (template === 'tabs') {
    views = indent(6, `
      <!-- Views/Tabs container -->
      <Views tabs class="safe-areas">
        <!-- Tabbar for switching views-tabs -->
        <Toolbar tabbar labels bottom>
          <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconAurora="f7:house_fill" iconMd="material:home" text="Home" />
          <Link tabLink="#view-catalog" iconIos="f7:square_list_fill" iconAurora="f7:square_list_fill" iconMd="material:view_list" text="Catalog" />
          <Link tabLink="#view-settings" iconIos="f7:gear" iconAurora="f7:gear" iconMd="material:settings" text="Settings" />
        </Toolbar>

        <!-- Your main view/tab, should have "view-main" class. It also has "tabActive" prop -->
        <View id="view-home" main tab tabActive url="/" />

        <!-- Catalog View -->
        <View id="view-catalog" name="catalog" tab url="/catalog/" />

        <!-- Settings View -->
        <View id="view-settings" name="settings" tab url="/settings/" />

      </Views>
    `);
  }

  return indent(0, `
    <App params={ f7params } ${theming.darkTheme ? 'themeDark' : ''}>
      ${leftPanel}
      ${rightPanel}
      ${views}

      <!-- Popup -->
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
                onInput={(e) => username = e.target.value}
              />
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => password = e.target.value}
              />
            </List>
            <List>
              <ListButton title="Sign In" onClick={() => alertLoginData()} />
            </List>
            <BlockFooter>
              Some text about login information.<br />Click "Sign In" to close Login Screen
            </BlockFooter>
          </Page>
        </View>
      </LoginScreen>
    </App>
    <script>
      import { onMount } from 'svelte';
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
      } from 'framework7-svelte';

      ${templateIf(type.indexOf('cordova') >= 0, () => `
      import cordovaApp from '../js/cordova-app';
      `)}
      import routes from '../js/routes';

      // Framework7 Parameters
      let f7params = {
        ${indent(8, appParameters(options)).trim()}
      };
      // Login screen demo data
      let username = '';
      let password = '';

      function alertLoginData() {
        f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
          f7.loginScreen.close();
        });
      }
      onMount(() => {
        f7ready(() => {
          ${templateIf(type.indexOf('cordova') >= 0, () => `
          // Init cordova APIs (see cordova-app.js)
          if (f7.device.cordova) {
            cordovaApp.init(f7);
          }
          `)}
          // Call F7 APIs here
        });
      })
    </script>
  `).trim();
};
