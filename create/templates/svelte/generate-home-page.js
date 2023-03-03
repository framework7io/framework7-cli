const indent = require('../../utils/indent');

module.exports = (options) => {
  const { name, template } = options;

  let description;
  if (template === 'single-view' || template === 'blank') {
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

  return indent(
    0,
    `
    <Page name="home">
      <!-- Top Navbar -->
      ${
        template === 'blank'
          ? `
      <Navbar large>
        <NavTitle>${name}</NavTitle>
        <NavTitleLarge>${name}</NavTitleLarge>
      </Navbar>
      `.trim()
          : `
      <Navbar large sliding={false}>
        <NavLeft>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" />
        </NavLeft>
        <NavTitle sliding>${name}</NavTitle>
        <NavRight>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right" />
        </NavRight>
        <NavTitleLarge>${name}</NavTitleLarge>
      </Navbar>
      `.trim()
      }
      ${
        template !== 'tabs'
          ? `
      <!-- Toolbar -->
      <Toolbar bottom>
        <Link>Left Link</Link>
        <Link>Right Link</Link>
      </Toolbar>

      `.trim()
          : ''
      }
      <!-- Page content -->
      <Block>
        ${description.trim()}
      </Block>

      ${
        template !== 'blank'
          ? `
      <BlockTitle>Navigation</BlockTitle>
      <List strong inset dividersIos>
        <ListItem link="/about/" title="About"/>
        <ListItem link="/form/" title="Form"/>
      </List>

      <BlockTitle>Modals</BlockTitle>
      <Block class="grid grid-cols-2 grid-gap">
        <Button fill popupOpen="#my-popup">Popup</Button>
        <Button fill loginScreenOpen="#my-login-screen">Login Screen</Button>
      </Block>

      <BlockTitle>Panels</BlockTitle>
      <Block class="grid grid-cols-2 grid-gap">
        <Button fill panelOpen="left">Left Panel</Button>
        <Button fill panelOpen="right">Right Panel</Button>
      </Block>

      <List strong inset dividersIos>
        <ListItem
          title="Dynamic (Component) Route"
          link="/dynamic-route/blog/45/post/125/?foo=bar#about"
        />
        <ListItem
          title="Default Route (404)"
          link="/load-something-that-doesnt-exist/"
        />
        <ListItem
          title="Request Data & Load"
          link="/request-and-load/user/123456/"
        />
      </List>
      `.trim()
          : ''
      }
    </Page>
    ${
      template === 'blank'
        ? `
    <script>
      import {
        Page,
        Navbar,
        NavTitle,
        NavTitleLarge,
        Link,
        Toolbar,
        Block,
      } from 'framework7-svelte';
    </script>
    `.trim()
        : `
    <script>
      import {
        Page,
        Navbar,
        NavLeft,
        NavTitle,
        NavTitleLarge,
        NavRight,
        Link,
        Toolbar,
        Block,
        BlockTitle,
        List,
        ListItem,
        Button
      } from 'framework7-svelte';
    </script>
    `.trim()
    }
  `,
  ).trim();
};
