import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './styles/app.css';
import LoginPage from "./Pages/LoginPage";
import UserPage from "./Pages/UserPage";

function App() {
  return (
    <div className="app_wrapper">
      <Router>
        <Switch>
          <Redirect from="/" to={`/user`} exact />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/user" exact component={UserPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
