const templateIf = require('../../utils/template-if');
const indent = require('../../utils/indent');

module.exports = (options) => {
  const { bundler, template } = options;

  let routes;
  // prettier-ignore
  if (template === 'blank') {
    if (bundler === 'vite') {
      routes = indent(0, `
        import HomePage from '../pages/home.f7';

        var routes = [
          {
            path: '/',
            component: HomePage,
          },
        ];
      `);
    } else {
      routes = indent(0, `
        var routes = [
          {
            path: '/',
            url: './index.html',
          },
        ];
      `);
    }
  } else if (bundler === 'vite') {
    routes = indent(0, `
      import HomePage from '../pages/home.f7';
      import AboutPage from '../pages/about.f7';
      import FormPage from '../pages/form.f7';
      ${templateIf(template === 'tabs', () => `
      import CatalogPage from '../pages/catalog.f7';
      import ProductPage from '../pages/product.f7';
      import SettingsPage from '../pages/settings.f7';
      `)}
      ${templateIf(template === 'split-view', () => `
      import LeftPage1 from '../pages/left-page-1.f7';
      import LeftPage2 from '../pages/left-page-2.f7';
      `)}
      ${templateIf(template !== 'blank', () => `
      import DynamicRoutePage from '../pages/dynamic-route.f7';
      import RequestAndLoad from '../pages/request-and-load.f7';
      import NotFoundPage from '../pages/404.f7';
      `)}

      var routes = [
        {
          path: '/',
          component: HomePage,
        },
        {
          path: '/about/',
          component: AboutPage,
        },
        {
          path: '/form/',
          component: FormPage,
        },
        ${templateIf(template === 'tabs', () => `
        {
          path: '/catalog/',
          component: CatalogPage,
        },
        {
          path: '/product/:id/',
          component: ProductPage,
        },
        {
          path: '/settings/',
          component: SettingsPage,
        },
        `)}
        ${templateIf(template === 'split-view', () => `
        {
          path: '/left-page-1/',
          component: LeftPage1,
        },
        {
          path: '/left-page-2/',
          component: LeftPage2,
        },
        `)}
        {
          path: '/dynamic-route/blog/:blogId/post/:postId/',
          component: DynamicRoutePage,
        },
        {
          path: '/request-and-load/user/:userId/',
          async: function ({ router, to, resolve }) {
            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = to.params.userId;

            // Simulate Ajax Request
            setTimeout(function () {
              // We got user data from request
              var user = {
                firstName: 'Vladimir',
                lastName: 'Kharlampidi',
                about: 'Hello, i am creator of Framework7! Hope you like it!',
                links: [
                  {
                    title: 'Framework7 Website',
                    url: 'http://framework7.io',
                  },
                  {
                    title: 'Framework7 Forum',
                    url: 'http://forum.framework7.io',
                  },
                ]
              };
              // Hide Preloader
              app.preloader.hide();

              // Resolve route to load page
              resolve(
                {
                  component: RequestAndLoad,
                },
                {
                  props: {
                    user: user,
                  }
                }
              );
            }, 1000);
          },
        },
        {
          path: '(.*)',
          component: NotFoundPage,
        },
      ];
    `);
  } else {
    routes = indent(0, `
      var routes = [
        {
          path: '/',
          url: './index.html',
        },
        {
          path: '/about/',
          url: './pages/about.html',
        },
        {
          path: '/form/',
          url: './pages/form.html',
        },
        ${templateIf(template === 'tabs', () => `
        {
          path: '/catalog/',
          componentUrl: './pages/catalog.html',
        },
        {
          path: '/product/:id/',
          componentUrl: './pages/product.html',
        },
        {
          path: '/settings/',
          url: './pages/settings.html',
        },
        `)}
        ${templateIf(template === 'split-view', () => `
        {
          path: '/left-page-1/',
          url: './pages/left-page-1.html',
        },
        {
          path: '/left-page-2/',
          url: './pages/left-page-2.html',
        },
        `)}
        {
          path: '/dynamic-route/blog/:blogId/post/:postId/',
          componentUrl: './pages/dynamic-route.html',
        },
        {
          path: '/request-and-load/user/:userId/',
          async: function ({ router, to, resolve }) {
            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = to.params.userId;

            // Simulate Ajax Request
            setTimeout(function () {
              // We got user data from request
              var user = {
                firstName: 'Vladimir',
                lastName: 'Kharlampidi',
                about: 'Hello, i am creator of Framework7! Hope you like it!',
                links: [
                  {
                    title: 'Framework7 Website',
                    url: 'http://framework7.io',
                  },
                  {
                    title: 'Framework7 Forum',
                    url: 'http://forum.framework7.io',
                  },
                ]
              };
              // Hide Preloader
              app.preloader.hide();

              // Resolve route to load page
              resolve(
                {
                  componentUrl: './pages/request-and-load.html',
                },
                {
                  props: {
                    user: user,
                  }
                }
              );
            }, 1000);
          },
        },
        // Default route (404 page). MUST BE THE LAST
        {
          path: '(.*)',
          url: './pages/404.html',
        },
      ];
    `);
  }

  if (bundler) {
    routes += '\nexport default routes;';
  }

  return routes;
};
