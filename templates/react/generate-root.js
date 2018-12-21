const indent = require('../../utils/indent');
const templateIf = require('../../utils/template-if');

module.exports = (options) => {
  const {
    template,
    pkg,
    name,
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
      <View main className="ios-edges" url="/" />
    `);
  }
  if (template === 'tabs') {
    views = indent(12, `
      {/* Views/Tabs container */}
      <Views tabs className="ios-edges">
        {/* Tabbar for switching views-tabs */}
        <Toolbar tabbar labels bottom>
          <Link tabLink="#view-home" tabLinkActive iconIos="f7:home_fil" iconMd="material:home" text="Home" />
          <Link tabLink="#view-catalog" iconIos="f7:list_fill" iconMd="material:view_list" text="Catalog" />
          <Link tabLink="#view-settings" iconIos="f7:settings_fill" iconMd="material:settings" text="Settings" />
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
            ${templateIf(pkg, () => `
            id: '${pkg}', // App bundle ID{{/if}}
            `)}
            name: '${name}', // App name
            theme: 'auto', // Automatic theme detection
            // App routes
            routes: routes,
            ${templateIf(template === 'split-view', () => `
            // Enable panel left visibility breakpoint
            panel: {
              leftBreakpoint: 960,
            },
            `)}
            ${templateIf(template === 'tabs', () => `
            // App root data
            data() {
              return {
                // Demo products for Catalog section
                products: [
                  {
                    id: '1',
                    title: 'Apple iPhone 8',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
                  },
                  {
                    id: '2',
                    title: 'Apple iPhone 8 Plus',
                    description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
                  },
                  {
                    id: '3',
                    title: 'Apple iPhone X',
                    description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
                  },
                ]
              }
            }
            `)}
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
      ${templateIf(type.indexOf('cordova') >= 0, () => `
      componentDidMount() {
        // Init cordova APIs (see cordova-app.js)
        this.$f7ready(() => {
          cordovaApp.init();
        });
      }
      `)}
    }
  `).trim();
};
