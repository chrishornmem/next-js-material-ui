import React, { createElement } from 'react';

import Adapter from 'enzyme-adapter-react-16';

import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { configure, mount } from 'enzyme';

configure({ adapter: new Adapter() });

const withRouterContext = (
  Component = 'div',
  initialProps = {},
  state = null,
  router = {
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
  },
  options = {},
) => {

  const wrapper = mount(
    createElement(
      (props) => (
        <RouterContext.Provider value={router}>
          <Component {...props} />
        </RouterContext.Provider>
      ),
      initialProps,
    ),
    options,
  );
  if (state) wrapper.find(Component).setState(state);
  return wrapper;
};

export default withRouterContext;
