import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import './Register.css';
import {AppUser} from "./types/AppUser.ts";
import {useNavigate} from "react-router-dom";

type RegisterPageProps = {
    fetchMe: () => void;
}
export default function RegisterPage(props : Readonly<RegisterPageProps>){
    const [formData, setFormData] = useState<AppUser>({
        name: '',
        surname: '',
        email: '',
        password: '',
        username: ''
    });
    const navigate=useNavigate();

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value});
    }

    function register(){
        axios.post("/api/users/register", formData)
            .then(()=> {
                console.log("Registered!");
                navigate("/");
                props.fetchMe();
            })
            .catch(()=>console.error("Failed to register"))

    }

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        register();
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name={"username"} placeholder={"Username"} value={formData.username}
                       type={"text"}/>
                <input onChange={handleChange} name={"password"} placeholder={"Password"} value={formData.password}
                       type={"password"}/>
                <input onChange={handleChange} name={"email"} placeholder={"Email"} value={formData.email}
                       type={"email"}/>
                <input onChange={handleChange} name={"name"} placeholder={"Name"} type={"name"}
                       value={formData.name}/>
                <input onChange={handleChange} name={"surname"} placeholder={"Surname"} type={"surname"}
                       value={formData.surname}/>
                <button>Register</button>
            </form>
        </div>

    )
}