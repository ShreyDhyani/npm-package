import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chooser from './Pages/Chooser';
import Welcome from './Pages/Welcome';

function App() {
	return (
		// <Chooser/>
		<BrowserRouter>
			<Routes>
				<Route exact path='/add' element={<Chooser />}></Route>
				<Route exact path='/' element={<Welcome />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
