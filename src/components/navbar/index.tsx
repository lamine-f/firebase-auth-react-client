import styles from "./style.module.css";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {getUserContext} from "../../contexts/userContext";
export default function () {

    const navigate = useNavigate();
    const userContext = useContext(getUserContext());
    const logOut = async () => {
        try {
            await userContext?.signOut();
            navigate("/")
        }catch (e) {
            alert("Error on signout ")
        }
    }

    return <header className={styles.header} >
        <h3>React FireBase Auth</h3>
        <ul className={styles.headerLinksContainer} >
            <li> <Link to={"/auth/signin"} > Sign In </Link> </li>
            <li> <Link to={"/auth/signup"} > Sign Up </Link> </li>
            <li onClick={logOut} > Sign Out </li>
        </ul>
    </header>
}