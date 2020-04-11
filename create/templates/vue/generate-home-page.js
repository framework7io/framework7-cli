const indent = require('../../utils/indent');

module.exports = (options) => {
  const {
    name,
    template,
  } = options;

  let description;
  if (template === 'single-view') {
    description = `
          <p>Here is your blank Framework7 app. Let's see what we have here.</p>
    `;
  }
  if (template === 'split-view') {
    description = `
          <p>This is an example of split view application layout, commonly used on tablets. The main approach of such kind of layout is that you can see different views at the same time.</p>

          <p>Each view may have different layout, different navbar type (dynamic, fixed or static) or without navbar.</p>

          <p>The fun thing is that you can easily control one view from another without any line of JavaScript just using "data-view" attribute on links.</p>
    `;
  }
  if (template === 'tabs') {
    description = `
          <p>This is an example of tabs-layout application. The main point of such tabbed layout is that each tab contains independent view with its own routing and navigation.</p>

          <p>Each tab/view may have different layout, different navbar type (dynamic, fixed or static) or without navbar like this tab.</p>
    `;
  }

  return indent(0, `
    <template>
      <f7-page name="home">
        <!-- Top Navbar -->
        <f7-navbar :sliding="false" large>
          <f7-nav-left>
            <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
          </f7-nav-left>
          <f7-nav-title sliding>${name}</f7-nav-title>
          <f7-nav-right>
            <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
          </f7-nav-right>
          <f7-nav-title-large sliding>${name}</f7-nav-title-large>
        </f7-navbar>
        ${template !== 'tabs' ? `
        <!-- Toolbar-->
        <f7-toolbar bottom>
          <f7-link>Left Link</f7-link>
          <f7-link>Right Link</f7-link>
        </f7-toolbar>

        `.trim() : ''}
        <!-- Page content-->
        <f7-block strong>
          ${description.trim()}
        </f7-block>

        <f7-block-title>Navigation</f7-block-title>
        <f7-list>
          <f7-list-item link="/about/" title="About"></f7-list-item>
          <f7-list-item link="/form/" title="Form"></f7-list-item>
        </f7-list>

        <f7-block-title>Modals</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col width="50">
              <f7-button fill raised popup-open="#my-popup">Popup</f7-button>
            </f7-col>
            <f7-col width="50">
              <f7-button fill raised login-screen-open="#my-login-screen">Login Screen</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Panels</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col width="50">
              <f7-button fill raised panel-open="left">Left Panel</f7-button>
            </f7-col>
            <f7-col width="50">
              <f7-button fill raised panel-open="right">Right Panel</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-list>
          <f7-list-item
            title="Dynamic (Component) Route"
            link="/dynamic-route/blog/45/post/125/?foo=bar#about"
          ></f7-list-item>
          <f7-list-item
            title="Default Route (404)"
            link="/load-something-that-doesnt-exist/"
          ></f7-list-item>
          <f7-list-item
            title="Request Data & Load"
            link="/request-and-load/user/123456/"
          ></f7-list-item>
        </f7-list>

      </f7-page>
    </template>
  `).trim();
};
