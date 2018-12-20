const templateIf = require('../../utils/template-if');
const indent = require('../../utils/indent');

module.exports = (options) => {
  const {
    bundler, template,
  } = options;

  let routes;

  // Webpack Routes
  if (bundler === 'webpack') {
    routes = indent(0, `
      import HomePage from '../pages/home.f7.html';
      import AboutPage from '../pages/about.f7.html';
      import FormPage from '../pages/form.f7.html';
      ${templateIf(template === 'tabs', () => `
      import CatalogPage from '../pages/catalog.f7.html';
      import ProductPage from '../pages/product.f7.html';
      import SettingsPage from '../pages/settings.f7.html';
      `)}
      ${templateIf(template === 'split-view', () => `
      import LeftPage1 from '../pages/left-page-1.f7.html';
      import LeftPage2 from '../pages/left-page-2.f7.html';
      `)}
      import DynamicRoutePage from '../pages/dynamic-route.f7.html';
      import RequestAndLoad from '../pages/request-and-load.f7.html';
      import NotFoundPage from '../pages/404.f7.html';

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
          async: function (routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = routeTo.params.userId;

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
                  context: {
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
  }

  // Plain Routes
  if (bundler !== 'webpack') {
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
          url: './pages-left-page-1.html',
        },
        {
          path: '/left-page-2/',
          url: './pages-left-page-2.html',
        },
        `)}
        {
          path: '/dynamic-route/blog/:blogId/post/:postId/',
          componentUrl: './pages/dynamic-route.html',
        },
        {
          path: '/request-and-load/user/:userId/',
          async: function (routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = routeTo.params.userId;

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
                  context: {
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
