import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";

import Sidebar from "components/Common/Sidebar";

import Profile from "./Settings/Profile";
import Records from "./Records";

const Dashboard = () => (
	<div className="flex h-screen w-full">
		<Sidebar />
		<Switch>
			<Route exact path="/my/profile" component={Profile} />
			<Route exact path="/" component={Records} />
		</Switch>
	</div>
);

export default Dashboard;
