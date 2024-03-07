"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import fileUploader from "./fileuploader.module.css"

const FileUploader = () =>{

    const [hasFileACTA_NACIMIENTO, setHasFileACTA_NACIMIENTO] = useState<boolean>(false);
    const [fileACTA_NACIMIENTO, setFileACTA_NACIMIENTO] = useState<File | undefined>(); 

    const handleChangeACTA_NACIMIENTO = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if(tempFile.size / 1024 > 15000){

                setHasFileACTA_NACIMIENTO(false);
                return;
            }
            else{
                setFileACTA_NACIMIENTO(tempFile);
                setHasFileACTA_NACIMIENTO(true);
            }
        }
        else{
            setHasFileACTA_NACIMIENTO(false);
            return;
        }
    };

    const handleDeleteACTA_NACIMIENTO  = () => {
        setHasFileACTA_NACIMIENTO(false);
    };


    return (
        <div className={fileUploader.container}>
                <div className={fileUploader.innerContainer}>
                    <div>Acta de nacimiento</div>
                    <div>
                        {
                            !hasFileACTA_NACIMIENTO ?
                            <div className={fileUploader.attachIcon}>
                                <label htmlFor="file-input">
                                    <FontAwesomeIcon icon={faCloudArrowUp}/>
                                </label>
                                <input type="file" id="file-input" name="file" accept="application/pdf" required onChange={handleChangeACTA_NACIMIENTO}/>
                            </div> :
                            <div>
                                <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                <div className={fileUploader.fileName}>
                                    {fileACTA_NACIMIENTO !== undefined ? fileACTA_NACIMIENTO.name : ""}
                                </div>
                                <button onClick={handleDeleteACTA_NACIMIENTO}>Delete</button>
                            </div>
                            
                        }
                    </div>
                </div>
        </div>
    )
}

export default FileUploader;