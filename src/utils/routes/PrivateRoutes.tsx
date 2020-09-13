import React from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";
import ErrorBoundary from "../../hoc/ErrorBoundary/ErrorBoundary";
import { routeDetailType } from "../../types/generalTypes";

const RenderRoute: React.FC<RouteProps> = (props) => {
  console.log('bipan');
  let { component, children, location } = props;

  let Component: React.ComponentType<any> = component!;

  let token: any = localStorage.getItem("access_token");

  if (
    !token &&
    location?.pathname !== "/homepage" && location?.pathname !== "/login" && location?.pathname !== "/signup"
  ) {
    return <Redirect to='/homepage' />;
  }

  if (!token && location?.pathname === "/") {
    return <Redirect to='/homepage' />;
  }

  return (
    <Route
      exact
      path={`${location?.pathname}`}
      render={(reactRouterProps) => {
        return (
          <ErrorBoundary>
            <Component {...reactRouterProps} {...props} routes={children} />
          </ErrorBoundary>
        );
      }}
    />
  );
};

interface PrivateRouteProps {
  appRoutes: routeDetailType[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => (
  <Switch>
    {props.appRoutes.map((route, index) => (
      <RenderRoute key={index} {...route} />
    ))}
  </Switch>
);

export default PrivateRoute;
