import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { app } from '../base';
import "./styles/uploadHandlerStyle.css";

export default function UploadHandler(props) {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            console.log(process.env.REACT_APP_API_KEY)
        }, 1000);
    }, [])

    // on click select video file handler
    function fileSelected(e) {
        setUploading(true);
        if (e.target.files[0]) {
            let file = e.target.files[0];
            // upload to firebase
            setFile(file);
            firebaseUpload(file);
        }
    }

    function firebaseUpload(file) {
        let storageRef = app.storage().ref();
        let fileRef = storageRef.child(file.name);
        fileRef.put(file).then((e) => {
            fileRef.getDownloadURL().then(function (url) {
                setUrl(url);
            });
        })
    }

    async function uploadImage() {
        console.log(url);
        props.setImage(url)
        setUploading(false);
    }

    return (
        <div className="uploadComponent" onClick={!url ? () => document.getElementById("selectImgFileInput").click() : null}>
            {
                uploading ?
                    <div>
                        <div className="loaderFlex">
                            <div className="loader">
                            </div>
                        </div>
                        <div className="uploadingFileMsg">
                            {"uploading " + file.name}
                        </div>
                    </div>
                    :
                    <div className="uploadText">
                        click here to upload image
                    </div>
            }

            <input style={{ "display": "none" }} accept="image/png, image/gif, image/jpeg" id="selectImgFileInput" type="file" onClick={(e) => e.target.value = ''} onChange={(e) => fileSelected(e)}></input>
            {url ? <img
                className="sampleImg"
                src={url}
                onLoad={() => uploadImage()}
                onError={() => alert("error occurred")}
            /> : null}
        </div>
    );
}