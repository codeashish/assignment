import Landing from './components/landing';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Cities from './components/Cities';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { Component } from 'react';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Route exact path="/" component={Landing} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Switch>
						<PrivateRoute exact path="/cities" component={Cities} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
