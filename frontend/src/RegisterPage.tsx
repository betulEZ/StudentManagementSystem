import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";

type AppUserDto = {
    username: string,
    password: string,
    email: string,
    avatarUrl: string,
}

export default function RegisterPage(){
    const [appUserDto, setAppUserDto] = useState<AppUserDto>({
        username: "",
        password: "",
        email: "",
        avatarUrl: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const name = event.target.name;
        const value = event.target.value;
        setAppUserDto({...appUserDto, [name]: value});
    }

    function register(){
        axios.post("/api/users/register", appUserDto)
            .then(()=>console.log("Registered!"))
            .catch(()=>console.error("Failed to register"))
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        register();
    }

    return(
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name={"username"} placeholder={"Username"} value={appUserDto.username} type={"text"}/>
            <input onChange={handleChange} name={"password"} placeholder={"Password"} value={appUserDto.password} type={"password"}/>
            <input onChange={handleChange} name={"email"} placeholder={"Email"} value={appUserDto.email} type={"email"}/>
            <input onChange={handleChange} name={"avatarUrl"} placeholder={"Avatar Url"} value={appUserDto.avatarUrl} type={"url"}/>
            <button>Register NOW!</button>
        </form>
    )
}