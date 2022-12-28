import React, { useEffect, useState } from "react";
import Left from "../LeftSideBar/LeftBar";
import Right from "../RightSideBar/RightBar";
import classes from "./Edit.module.css";
import Header from "../Header/Header";
export default function Edit(props) {
  let empty = true;
  let [img, setImg] = useState({});
  let [name, setName] = useState("");
  let [desc, setDesc] = useState("");
  let url = "https://my-rest-api-twitter.herokuapp.com";
  url = "https://rest-api-twitter.onrender.com";

  useEffect(() => {
    let isMounted = true;
    fetch(url + "/edit/" + props.match.params.id, {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((user) => {
        if (isMounted) {
          setName(user.name);
          setDesc(user.desc);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [props.match.params.id]);
  function inputHandler(e, type) {
    if (type === "name") {
      setName(e.target.value);
    } else if (type === "file") {
      setImg(e.target.files[0]);
    } else if (type === "desc") {
      setDesc(e.target.value);
    }
  }
  function submit() {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("image", img);
    formData.append("desc", desc);
    props.history.goBack();
    fetch(url + "/edit/" + props.match.params.id, {
      mode: "no-cors",
      method: "POST",
      body: formData,
    })
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        let existing = localStorage.getItem("user");
        existing = existing ? JSON.parse(existing) : {};

        existing["picture"] = res.picture;

        localStorage.setItem("user", JSON.stringify(existing));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className={classes.home}>
      <Left />
      <div className={classes.edit}>
        <Header
          title="Edit"
          showBackButton={true}
          goBack={props.history.goBack}
          logout={props.logout}
        />
        <div className={classes.editForm}>
          <div className={classes.form}>
            <label htmlFor="name">Edit Name</label>
            <input
              name="name"
              id="name"
              value={name}
              onChange={(e) => inputHandler(e, "name")}
            ></input>
            <label htmlFor="img">Edit Img</label>
            <input
              name="img"
              id="img"
              type="file"
              onChange={(e) => inputHandler(e, "file")}
            />
            <label htmlFor="desc">Edit Desc</label>
            <input
              name="desc"
              id="desc"
              value={desc}
              type="text"
              onChange={(e) => inputHandler(e, "desc")}
            />
            <button onClick={submit} className={classes.submit}>
              Submit Changes
            </button>
          </div>
        </div>
      </div>
      <Right empty={empty} />
    </div>
  );
}
