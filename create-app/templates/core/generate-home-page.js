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
    <div class="page" data-name="home">
      <!-- Top Navbar -->
      <div class="navbar navbar-large">
        <div class="navbar-bg"></div>
        <div class="navbar-inner">
          <div class="left">
            <a href="#" class="link icon-only panel-open" data-panel="left">
              <i class="icon f7-icons if-not-md">menu</i>
              <i class="icon material-icons if-md">menu</i>
            </a>
          </div>
          <div class="title sliding">${name}</div>
          <div class="right">
            <a href="#" class="link icon-only panel-open" data-panel="right">
              <i class="icon f7-icons if-not-md">menu</i>
              <i class="icon material-icons if-md">menu</i>
            </a>
          </div>
          <div class="title-large">
            <div class="title-large-text">${name}</div>
          </div>
        </div>
      </div>
      ${template !== 'tabs' ? `
      <!-- Toolbar-->
      <div class="toolbar toolbar-bottom">
        <div class="toolbar-inner">
          <a href="#" class="link">Left Link</a>
          <a href="#" class="link">Right Link</a>
        </div>
      </div>
      `.trim() : ''}
      <!-- Scrollable page content-->
      <div class="page-content">
        <div class="block block-strong">
          ${description.trim()}
        </div>

        <div class="block-title">Navigation</div>
        <div class="list">
          <ul>
            <li>
              <a href="/about/" class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title">About</div>
                </div>
              </a>
            </li>
            <li>
              <a href="/form/" class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title">Form</div>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div class="block-title">Modals</div>
        <div class="block block-strong">
          <div class="row">
            <div class="col-50">
              <a href="#" class="button button-raised button-fill popup-open" data-popup="#my-popup">Popup</a>
            </div>
            <div class="col-50">
              <a href="#" class="button button-raised button-fill login-screen-open" data-login-screen="#my-login-screen">Login Screen</a>
            </div>
          </div>
        </div>

        <div class="block-title">Panels</div>
        <div class="block block-strong">
          <div class="row">
            <div class="col-50">
              <a href="#" class="button button-raised button-fill panel-open" data-panel="left">Left Panel</a>
            </div>
            <div class="col-50">
              <a href="#" class="button button-raised button-fill panel-open" data-panel="right">Right Panel</a>
            </div>
          </div>
        </div>

        <div class="list links-list">
          <ul>
            <li>
              <a href="/dynamic-route/blog/45/post/125/?foo=bar#about">Dynamic (Component) Route</a>
            </li>
            <li>
              <a href="/load-something-that-doesnt-exist/">Default Route (404)</a>
            </li>
            <li>
              <a href="/request-and-load/user/123456/">Request Data & Load</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `).trim();
};
