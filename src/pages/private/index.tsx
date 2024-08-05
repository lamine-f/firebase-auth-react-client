import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {getUserContext, UserContextProvider} from "../../contexts/userContext";

export default function Private () {

    const userContext = useContext(getUserContext())
    console.log("private/user=", userContext?.currentUser);
    if (!userContext?.currentUser) return <Navigate to={"/"}/>

    return <>
        <Outlet></Outlet>
    </>

}