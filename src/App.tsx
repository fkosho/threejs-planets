import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SampleFirst } from "./pages/SampleFirst";
import { SampleSecond } from "./pages/SampleSecond";
import { SampleThird } from "./pages/SampleThird";

export const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <SampleFirst />
          </Route>
          <Route exact path="/sample2">
            <SampleSecond />
          </Route>
          {/* 既存と同じDOM取得方法 */}
          <Route path="/sample3">
            <SampleThird />
          </Route>
          <Redirect to="/" path="*" />
        </Switch>
      </Router>
    </>
  );
};
