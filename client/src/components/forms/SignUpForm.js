import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from "dayjs";
import axios from "axios";

import style from '../../styles/forms.module.css'

export default function LandingPage() {

    const handleSubmit = (e) => {
        // collect
        e.preventDefault()
        let obj = {}
        for (let i = 0; i < e.target.length; i++) {
            if (!e.target[i].name) continue;
            switch (e.target[i].type) {
                case "password":
                    if (e.target[i].value !== e.target[i + 1].value) { toast.error("Password mismatch"); return; }
                    obj[e.target[i].name] = e.target[i].value
                    break;

                case "date":
                    if (dayjs(e.target[i].value) >= dayjs().subtract(4745, 'day')) {
                        toast.error("you born yesterday/future? you younger than 13?"); return;
                    }
                    obj[e.target[i].name] = e.target[i].value
                    continue;

                case "submit": continue;
                default:
                    obj[e.target[i].name] = e.target[i].value
            }
        }
        // post collected to backend
        axios.post("http://localhost:5000/user/add", obj, {
            'Content-Type': 'application/json'
        }).then((response) => {
            if (response.data.success) { toast.success("gotcha fam 👍🏻") } else {
                toast.error(`nah man, error. Server said👆🏻"${response.data.serverMessage}"`)
            }
        }).catch((error) => { toast.error("server didn't get back to us 😔, check console for"); console.log(error) })

        // update UI

    }

    return (
        <>
            <h1>Sign Up</h1>
            <form on className={style["form"]} onSubmit={handleSubmit}>
                <FormControl className={style["form-control"]}>
                    <FormLabel>First Name</FormLabel>
                    <TextField variant="filled" inputProps={{ 'name': 'firstName' }} required type="text" /></FormControl>
                <FormControl className={style["form-control"]}>
                    <FormLabel>Last Name</FormLabel>
                    <TextField variant="filled" inputProps={{ 'name': 'lastName' }} required type="text" /></FormControl>
                <FormControl className={style["form-control"]}>
                    <FormLabel>Birthday</FormLabel>
                    <TextField variant="filled" inputProps={{ 'name': 'dateOfBirth' }} required type="date" /></FormControl>
                <FormControl className={style["form-control"]}>
                    <FormLabel>Email</FormLabel>
                    <TextField variant="filled" inputProps={{ 'name': 'emailAddress' }} required type="email" /></FormControl >
                <FormControl className={style["form-control"]}>
                    <FormLabel>Password</FormLabel>
                    <TextField variant="filled" inputProps={{ 'name': 'password', 'minlength': "6" }} required type="password" />
                </FormControl>
                <FormControl className={style["form-control"]}>
                    <FormLabel>Re-type password</FormLabel>
                    <TextField variant="filled" required type="password" /></FormControl>
                <Button variant="contained" type="submit">Sign Up</Button>
            </form>
            <ToastContainer theme="colored" />
        </>
    );
}