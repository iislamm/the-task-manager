import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard';
import SignIn from './Components/Auth/Signin';
import Signup from './Components/Auth/Signup';
import CreateList from './Components/Create/CreateList';
import { deepPurple } from '@material-ui/core/colors';
import ListDetails from './Components/Lists/ListDetails';
import CreateTask from './Components/Create/CreateTask';


const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: deepPurple,
	},
	typography: {
		useNextVariants: true,
	},
});

function App() {
	return (
		<div>
				<BrowserRouter>
					<MuiThemeProvider theme={theme}>
						<Navbar />
						<Switch>
							<Route exact path='/' component={Dashboard} />
							<Route exact path='/lists/create' component={CreateList} />
							<Route exact path='/signin' component={SignIn} />
							<Route exact path='/signup' component={Signup} />
							<Route exact path='/lists/:list' component={ListDetails} />
							<Route exact path='/tasks/create' component={CreateTask} />
						</Switch>

					</MuiThemeProvider>
				</BrowserRouter>
		</div>
	);
}

export default App;
