const templateIf = require('../../utils/template-if');
const indent = require('../../utils/indent');

module.exports = (options) => {
  const {
    template,
  } = options;

  if (template === 'blank') {
    return indent(0, `
      import HomePage from '../pages/home.jsx';

      var routes = [
        {
          path: '/',
          component: HomePage,
        },
      ];
      export default routes;
    `);
  }
  // Webpack Routes
  const routes = indent(0, `
    import HomePage from '../pages/home.jsx';
    import AboutPage from '../pages/about.jsx';
    import FormPage from '../pages/form.jsx';
    ${templateIf(template === 'tabs', () => `
    import CatalogPage from '../pages/catalog.jsx';
    import ProductPage from '../pages/product.jsx';
    import SettingsPage from '../pages/settings.jsx';
    `)}
    ${templateIf(template === 'split-view', () => `
    import LeftPage1 from '../pages/left-page-1.jsx';
    import LeftPage2 from '../pages/left-page-2.jsx';
    `)}
    import DynamicRoutePage from '../pages/dynamic-route.jsx';
    import RequestAndLoad from '../pages/request-and-load.jsx';
    import NotFoundPage from '../pages/404.jsx';

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

    export default routes;
  `);

  return routes;
};
