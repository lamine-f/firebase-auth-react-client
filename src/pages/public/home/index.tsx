import ShowPrivate from "../../../components/showprivate";
import React from "react";

export default function () {
    return <div>
        <ShowPrivate
            ifSignIn={<h1>Welcome buddy</h1>}
            ifNot={<h1>Hello App page !</h1>}
        />
    </div>
}