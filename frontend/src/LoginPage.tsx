import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

type LoginPageProps = {
    fetchMe: () => void;
}

export default function LoginPage(props : Readonly<LoginPageProps>) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function login() {
        axios.post("/api/users/login", {}, {
            auth: {
                username: username,
                password: password
            }
        }).then(() => {
            console.log("Welcome back!")
            navigate("/");
            props.fetchMe();
        }).catch(() => {
            console.error("Invalid credentials")
        })
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        login();
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" placeholder="Username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)} type="password"/>
                </div>
                <button>Login</button>
            </form>
            <div className="photo">
                <img src="../src/image/student.jpg" alt="Login"/>
            </div>
        </div>

    );
}
