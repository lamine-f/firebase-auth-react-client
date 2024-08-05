import styles from "./style.module.css"
import {Link, useNavigate} from "react-router-dom";
import {DetailedHTMLProps, FormHTMLAttributes, LegacyRef, useContext, useRef, useState} from "react";
import {getUserContext} from "../../../../contexts/userContext";

export default function () {
    const navigate = useNavigate();
    const userContext = useContext(getUserContext());
    const formRef = useRef<any>(null)
    const [ validationMessage, setValidationMessage] = useState<string>("")
    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if ( (e.target[1].value.length || e.target[2].value.length) < 6 ) {
            setValidationMessage("Mot de passe doit etre suppérieure à 6 chars");
            return;
        }
        if ( e.target[1].value !== e.target[2].value ) {
            setValidationMessage("Les mots de passes doivent correspondre");
            return;
        }
        setValidationMessage("");
        try {
            const credentials = await userContext?.signUp(
                e.target[0].value,
                e.target[1].value,
            )
            formRef.current?.reset();
            navigate("/home")

        }catch (err: any) {
            console.dir(err)
            if (err.code === "auth/invalid-email" ) setValidationMessage("email is invalid")

        }
    }

    return <div className={styles.wrapper}>
        <div className={styles.container} >
            <h1>Sign UP</h1>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className={styles.form}
                ref={formRef}
            >
                <div className={styles.textLabelInputContainer} >
                    <label> Email: </label>
                    <input type="text" />
                </div>
                <div className={styles.textLabelInputContainer} >
                    <label> Mot de passe: </label>
                    <input type="password" />
                </div>

                <div className={styles.textLabelInputContainer} >
                    <label>Confirmer le mot de passe: </label>
                    <input type="password" />
                </div>
                <button>Validate</button>
            </form>
            <p style={{color: "red"}} >{validationMessage}</p>
            <Link to={"/signin"}>Connexion</Link>
        </div>
    </div>
}