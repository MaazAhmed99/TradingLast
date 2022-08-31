import React from "react";
import { Redirect, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes({ component: Component, ...restOfProps }) {
	const isLogin = useSelector((state) => state.AuthReducer.isLogin);
	return <>{isLogin ? <Outlet /> : <Navigate to="/" />}</>;
}

export default ProtectedRoutes;
