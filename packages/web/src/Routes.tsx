import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/Home";
import { ConfirmRouter } from "./pages/auth/confirm/ConfirmRouter";
import { Forgot } from "./pages/auth/forgot/ForgotRouter";
import { Account } from "./pages/Account";
import { AuthControl } from "./contexts/AuthContext";
import {
  CONFIRM_EMAIL_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "./constants/routes";

export const Routes: React.FC = () => {
  return (
    <AuthControl>
      <Router>
        <div className="App">
          <Switch>
            {/* Home */}
            <Route exact path="/" component={Home} />

            {/* auth routes */}
            <Route exact path="/account" component={Account} />
            <Route exact path={REGISTER_ROUTE} component={Register} />
            <Route exact path={LOGIN_ROUTE} component={Login} />
            <Route
              path={`${CONFIRM_EMAIL_ROUTE}/:token`}
              component={ConfirmRouter}
            />
            <Route exact path={CONFIRM_EMAIL_ROUTE} component={ConfirmRouter} />
            <Route
              path={`${FORGOT_PASSWORD_ROUTE}/:token`}
              component={Forgot}
            />
            <Route path={FORGOT_PASSWORD_ROUTE} component={Forgot} />

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </AuthControl>
  );
};
