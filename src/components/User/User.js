import React, {useEffect, useState} from 'react'
import classes from './User.module.css'
export default function User(props) {
    let [user, setUser] = useState({});
    console.log(props)
    useEffect(()=>{
        fetch("http://localhost:5000/" +props.match.params.username, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': "Bearer " + token
        },
    }).then(result=>{
        return result.json()
    }).then(user=>{
        console.log(user);
        setUser(user[0])
    })
    // return ()=> 
    }, []);
    return (
        <div >
            {user.name}        
        </div>
    )
}
