import "./App.css";
import { Routes, Route } from "react-router";

import AuthenticatedLayout from "@layouts/AuthenticatedLayout";
import Dashboard from "@pages/dashboard/Dashboard";
import Application from "@pages/application/Application";
import ApplicationProfile from "@pages/application/ApplicationProfile";
import ApplicationEditForm from "@pages/application/ApplicationEditForm";
import PWDForm from "@/pages/pwd/PWDForm";
import NotFound from "@pages/NotFound";
import PWD from "@/pages/pwd/PWD";
import Map from "@/pages/map/Map";
import Disability from "@/pages/disability/Disability";
import Personnel from "@/pages/user/Personnel";
import Analytics from "@/pages/analytics/Analytics";
import Reports from "@/pages/reports/Reports";
import PersonnelForm from "@/pages/user/PersonnelForm";
import PWDProfile from "@/pages/pwd/PWDProfile";
import DisabilityForm from "@/pages/disability/DisabilityForm";
import GuestLayout from "@layouts/GuestLayout";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";


function App() {

	return(
		<Routes>
			<Route element={<GuestLayout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Route>

			<Route path="/" element={<AuthenticatedLayout />}>
				<Route path="" element={<Dashboard />}/>
				<Route path="pwd" element={<PWD />} />
				<Route path="pwd/:pwdId" element={<PWDProfile />} />
				<Route path="application" element={<Application />} />
				<Route path="application/:applicationId" element={<ApplicationProfile />}/>
				<Route path="application/create" element={<PWDForm />}/>
				<Route path="application/:applicationId/edit" element={<ApplicationEditForm />}/>
				<Route path="disability" element={<Disability />} />
				<Route path="disability/create" element={<DisabilityForm />} />
				<Route path="personnel" element={<Personnel />} />
				<Route path="personnel/create" element={<PersonnelForm />} />
				<Route path="map" element={<Map />} />
				<Route path="analytics" element={<Analytics />} />
				<Route path="reports" element={<Reports />} />
			</Route>
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
