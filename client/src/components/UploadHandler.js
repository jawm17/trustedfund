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

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log(process.env.REACT_APP_API_KEY)
    //     }, 1000);
    // }, [])

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
            {url ?
                <svg onClick={() => setUrl("")} id="removeImgBtn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                : null}
        </div>
    );
}