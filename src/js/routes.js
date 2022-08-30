
import HomePage from '../pages/home.f7';
import Profile from '../pages/profile.f7';
import Songs from '../pages/songs.f7';
import Network from '../pages/network.f7';
import Messages from '../pages/messages.f7';
import AboutPage from '../pages/about.f7';
import FormPage from '../pages/form.f7';
import DevotionalPage from '../pages/single-devotional.f7';


import DynamicRoutePage from '../pages/dynamic-route.f7';
import RequestAndLoad from '../pages/request-and-load.f7';
import NotFoundPage from '../pages/404.f7';

var routes = [
  {
    path: '/',
    component: DevotionalPage,
    // component: HomePage,
  },
  // {
  //   path: '/devotional/',
  //   component: DevotionalPage,
  // },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/profile/',
    component: Profile,
  },
  {
    path: '/songs/',
    component: DevotionalPage,
  },
  {
    path: '/network/',
    component: Network,
  },
    {
    path: '/messages/',
    component: Messages,
  },
  {
    path: '/form/',
    component: FormPage,
  },
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

export default routes;