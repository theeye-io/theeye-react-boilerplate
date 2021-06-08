import React, { useState } from "react";
import { Register } from "./apis/session/session.handler";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("")

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
                        <input
                value={user}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setUser(e.target.value)
                }
                type="text"
                name="email"
                placeholder="user"
                required
            ></input>
            <button className="submit-btn" onClick={() => Register(user, email)}>
                REGISTER
            </button>
        </>
    );
}
