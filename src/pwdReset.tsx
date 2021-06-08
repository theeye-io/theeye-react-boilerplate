import React, { useState } from "react";
import { recover } from "./apis/session/session.handler";

export default function PasswordResetPage() {
    const [email, setEmail] = useState("")

    return (
        <>
            <input
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setEmail(e.target.value)
                }
                type="text"
                name="email"
                placeholder="e-mail"
                required
            ></input>
            <button
                className="submit-btn"
                onClick={() => recover(email)}
            >
                SEND EMAIL
            </button>
        </>
    );
}
