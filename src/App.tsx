import React from 'react';
import  './App.css';
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/public/auth/signin";
import SignUp from "./pages/public/auth/signup";
import Private from "./pages/private";
import PublicHome from "./pages/public/home";
import PrivateHome from "./pages/private/home";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className={"appWrapper"}>
        <Navbar/>
        <Routes>
            <Route path={"/"} >
                <Route path={""} element={<PublicHome/>} />
                <Route path={"auth"}  >
                  <Route path={"signin"} element={<SignIn/>} />
                  <Route path={"signup"} element={<SignUp/>} />
                </Route>

                <Route path={""} element={<Private/>} >
                    <Route path={"home"} element={<PrivateHome/>} />
                </Route>

            </Route>

        </Routes>
    </div>
  );
}

export default App;
