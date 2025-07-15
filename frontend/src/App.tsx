import "./App.css";
import { Routes, Route } from "react-router";
Dashboard
// import TestForm from "./pages/TestForm";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import Application from "./pages/Application";
import PWDForm from "./pages/PWDForm";
import NotFound from "./pages/NotFound";
import TestPage from "./pages/Test/TestPage";

function App() {

	return(
		// <TestForm />
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Dashboard />} />
				<Route path="pwd-management" />
				<Route path="application" element={<Application />}/>
				<Route path="pwd-form" element={<PWDForm />}/>
				<Route path="disability" />
				<Route path="personnel" />
				<Route path="map" />
				<Route path="analytics" />
				<Route path="reports" />
				
				{/* test only  */}
				<Route path="test" element={<TestPage />} />
			</Route>
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
