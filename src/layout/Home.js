import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../views/Dashboard";

const Home = () => {
  const renderLoader = () => <p>Loading</p>;

  return (
    <>
      <div className="mx-16">
        <Suspense fallback={renderLoader()}>
          <Switch>
            <Route path="/home" exact component={Dashboard} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default Home;
