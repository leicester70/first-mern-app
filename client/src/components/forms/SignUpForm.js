import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from "dayjs";

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
                    let date = dayjs(e.target[i].value).$d.toString() //save date in dayjs format
                    if (dayjs(e.target[i].value) >= dayjs().subtract(1, 'day')) { toast.error("you born yesterday?"); }
                    obj[e.target[i].name] = date;
                    continue;

                case "submit": continue;
                default:
                    obj[e.target[i].name] = e.target[i].value
            }
        }

        // check collected
        console.log(obj)

        // post collected to backend

        // check backend response

        // update UI
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form className={style["form"]} onSubmit={handleSubmit}>
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
                    <TextField variant="filled" inputProps={{ 'name': 'password' }} required type="password" />
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