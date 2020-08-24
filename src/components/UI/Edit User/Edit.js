import React, {useEffect, useState} from 'react'
import Left from '../LeftSideBar/LeftBar';
import Right from '../RightSideBar/RightBar';
import classes from './Edit.module.css';
import Input from '../Input/Input'
export default function Edit(props) {
    let empty = true;
    console.log(props);
    let [img, setImg] = useState({});
    let [name, setName] = useState("");
    let [desc, setDesc] = useState("");
    useEffect(()=>{
        fetch("http://localhost:5000/edit/" +props.match.params.id, {
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
        setName(user.name);
        setDesc(user.desc);
        // setImg()
    })
    // return ()=> setCommented(false)
    }, []);
    function inputHandler(e, type){
        if(type=="name"){
            setName(e.target.value)
        } else if(type=="file"){
            setImg(e.target.files[0]);
        } else if(type=="desc"){
            setDesc(e.target.value);
        }
    }
    function submit(){
        let formData = new FormData();
        formData.append("name", name);
        formData.append("image", img );
        formData.append("desc", desc );

        fetch("http://localhost:5000/edit/"+props.match.params.id,{
            method: "POST",
            body: formData
        }).then(result=>{
            console.log(result);
            return result.json()
        }).then(res=>{
            console.log(res);
            // let newSave = JSON.parse(localStorage.getItem("user")).picture = res.picture;
            // localStorage.setItem("user", JSON.stringify(newSave)) 
            // Get the existing data
        var existing = localStorage.getItem('user');
        existing = existing ? JSON.parse(existing) : {};

        existing['picture'] = res.picture;

        localStorage.setItem('user', JSON.stringify(existing));
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className={classes.home}>
            <Left />
            <div className={classes.edit}>
                {/* fsddsfsd how are you all i am not bad tbh hoow are you all */}
                {/* <Input name="email" label="email"/> */}
                <form>
                <label htmlFor="name">Edit Name</label>
                <input name="name" id="name" value={name} onChange={(e)=> inputHandler(e,"name")}></input>
                <label htmlFor="img">Edit Img</label>
                <input name="img" id="img" type="file" onChange={(e)=> inputHandler(e, "file")}/>
                <label htmlFor="desc">Edit Desc</label>
                <input name="desc" id="desc" value={desc} type="text" onChange={(e)=> inputHandler(e, "desc")}/>
                <button onClick={submit} className={classes.submit}>Submit Changes</button>
                </form>
                

            </div>
            <Right empty={empty}/>
        </div>
    )
}
