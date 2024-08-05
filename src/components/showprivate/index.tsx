import {PropsWithChildren, ReactNode, useContext} from "react";
import {getUserContext} from "../../contexts/userContext";

type customChildren = PropsWithChildren | string | ReactNode
export default function ({ifSignIn, ifNot}: {
        ifSignIn: customChildren,
        ifNot?: customChildren,
    }
) {
    const userContext = useContext(getUserContext());
    return userContext?.currentUser ? <>{ifSignIn}</> : <>{ifNot}</>
}