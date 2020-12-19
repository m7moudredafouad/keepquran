import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './shared/nav/Nav';
import About from './pages/about/About';
import Start from './pages/start/Start';
import Home from './pages/keep/Home';
import Read from './pages/read/Read';

const App = () => {
	return (
		<BrowserRouter>
			<Nav />
			<Switch>
				<Route path="/about">
					<About />
				</Route>

				<Route path="/keep">
					<Home />
				</Route>

				<Route path="/read/:surahNumber">
					<Read />
				</Route>

				<Route path="/">
					<Start />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
