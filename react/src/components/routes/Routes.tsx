import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { withRoute } from 'components/contexts/AppContexts';

export default function Routes({ routes }: IRoutes) {
  const defaults = {
    hideNav: false
  };

  function reduceRoutes(
    routes: IRoute[],
    prevName = '',
    prevPath = '',
    prevRole?: true | string[]
  ): IRoute[] {
    return routes.reduce((prev, curr) => {
      const next = curr;

      next.name = prevName + next.name;
      if (next.path !== undefined) {
        next.path = prevPath + next.path;
      }

      if (next.roles === true) {
        next.roles = prevRole;
      }

      // Set defaults.
      if (next.hideNav === undefined) {
        next.hideNav = defaults.hideNav;
      }

      // Loop children.
      let child;
      if (next.children !== undefined && next.children.length > 0) {
        child = reduceRoutes(next.children, next.name, next.path, next.roles);
      }

      // Cleanup the children since we're done with it.
      delete next.children;

      let final;
      if (child !== undefined) {
        final = [...prev, next, ...child];
      } else {
        final = [...prev, next];
      }

      return final;
    }, [] as IRoute[]);
  }

  const reducedRoutes = reduceRoutes(routes).map((route: IRoute) => {
    const component = withRoute(
      (props: JSX.IntrinsicAttributes) => <route.component {...props} />,
      route
    );

    if (route.path !== undefined) {
      return (
        <Route key={route.name} exact path={route.path} component={component} />
      );
    }

    return <Route key={route.name} component={component} />; // 404 Not Found.
  });

  return <Switch>{reducedRoutes}</Switch>;
}

interface IRoutes {
  routes: IRoute[];
}

export interface IRoute {
  name: string;
  path?: string;
  component: any;
  hideNav?: boolean;
  roles?: true | string[];
  children?: IRoute[];
}
