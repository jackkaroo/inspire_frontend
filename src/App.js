import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './styles/app.css';
import LoginPage from "./Pages/LoginPage";
import UserPage from "./Pages/UserPage";
import SubscriptionsPage from "./Pages/SubscriptionsPage";
import FollowingsPage from "./Pages/FollowingsPage";
import SignupPage from "./Pages/SignupPage";
import ChallengePage from "./Pages/ChallengePage";
import Header from "./components/Header";

function App() {
    return (
        <div className="app_wrapper">
            <Header />
            <Router>
                <Switch>
                    <Redirect from="/" to={`/user`} exact/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/user" exact component={UserPage}/>
                    <Route path="/my-subscriptions" exact component={SubscriptionsPage}/>
                    <Route path="/my-followings" exact component={FollowingsPage}/>
                    <Route path="/signup" exact component={SignupPage} />
                    <Route path="/challenge/:id" component={ChallengePage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
