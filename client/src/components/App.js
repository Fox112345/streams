import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./stream/StreamCreate";
import StreamDelete from "./stream/StreamDelete";
import StreamEdit from "./stream/StreamEdit";
import StreamList from "./stream/StreamList";
import StreamShow from "./stream/StreamShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className={`ui container`}>
      <Router history={history}>
        <>
          <Header />
          <Switch>
            <Route path={`/`} exact component={StreamList} />
            <Route path={`/streams/new`} exact component={StreamCreate} />
            <Route path={`/streams/edit/:id`} exact component={StreamEdit} />
            <Route
              path={`/streams/delete/:id`}
              exact
              component={StreamDelete}
            />
            <Route path={`/streams/:id`} exact component={StreamShow} />
          </Switch>
        </>
      </Router>
    </div>
  );
};

export default App;
