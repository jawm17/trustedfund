import React from "react";
import UploadHandler from "../../components/UploadHandler";
import "./createStyle.css";

export default function Create() {

    async function createProject() {

    }

    return (
        <div>
            create
            <div>
                title
            </div>
            <input></input>
            <div>
                description
            </div>
            <UploadHandler />
            <input></input>
            <div>
                funding goal
            </div>
            <input></input>
            <div onClick={() => createProject()}>
                publish
            </div>
        </div>
    );
}