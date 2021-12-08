import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './styles/app.css';
import LoginPage from "./Pages/LoginPage";
import UserPage from "./Pages/UserPage";
import SubscriptionsPage from "./Pages/SubscriptionsPage";
import FollowingsPage from "./Pages/FollowingsPage";

function App() {
    return (
        <div className="app_wrapper">
            <Router>
                <Switch>
                    <Redirect from="/" to={`/user`} exact/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/user" exact component={UserPage}/>
                    <Route path="/my-subscriptions" exact component={SubscriptionsPage}/>
                    <Route path="/my-followings" exact component={FollowingsPage}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
