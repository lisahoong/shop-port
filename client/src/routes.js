import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashBoardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import ShoppingPage from './containers/ShoppingPage.jsx';
import SelectMerchantPage from './containers/SelectMerchantPage.jsx';
import Auth from './modules/Auth';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, cb) => {
        if (Auth.isUserAuthenticated()) {
          cb(null, DashBoardPage);
        } else {
          cb(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/shop',
      component: ShoppingPage
    },
    {
      path: '/additem',
      component: ShoppingPage
    },
    {
      path: '/select',
      component: SelectMerchantPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/');
      }
    }

  ]
};

export default routes;
