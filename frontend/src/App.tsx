import "./App.css";
import { Routes, Route } from "react-router";
Dashboard
// import TestForm from "./pages/TestForm";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import Application from "./pages/Application";
import NotFound from "./pages/NotFound";

function App() {

	return(
		// <TestForm />
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Dashboard />} />
				<Route path="pwd-management" />
				<Route path="application" element={<Application />}/>
				<Route path="disability" />
				<Route path="personnel" />
				<Route path="map" />
				<Route path="analytics" />
				<Route path="reports" />
			</Route>
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
