import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NewTicket from './pages/NewTicket'
import Header from './components/Header'
import Register from './pages/Register'
import Tickets from './pages/Tickets'
import Ticket from './pages/Ticket'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
	return (
		<>
			<Router>
				<div className='container'>
					<Header />
					<Routes>
						<Route
							path='/'
							element={<Home />}
						/>
						<Route
							path='/login'
							element={<Login />}
						/>
						<Route
							path='/register'
							element={<Register />}
						/>
						<Route
							path='/new-ticket'
							element={
								<PrivateRoute>
									<NewTicket />
								</PrivateRoute>
							}
						/>
						<Route
							path='/tickets'
							element={
								<PrivateRoute>
									<Tickets />
								</PrivateRoute>
							}
						/>
						<Route
							path='/ticket/:ticketId'
							element={
								<PrivateRoute>
									<Ticket />
								</PrivateRoute>
							}
						/>
					</Routes>
				</div>
			</Router>

			<ToastContainer />
		</>
	)
}

export default App
