"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
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

    const [hasFileCURP_ALUMNO, setHasFileCURP_ALUMNO] = useState<boolean>(false);
    const [fileCURP_ALUMNO, setFileCURP_ALUMNO] = useState<File | undefined>();
    const handleChangeCURP_ALUMNO = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if(tempFile.size / 1024 > 15000){

                setHasFileCURP_ALUMNO(false);
                return;
            }
            else{
                setFileCURP_ALUMNO(tempFile);
                setHasFileCURP_ALUMNO(true);
            }
        }
        else{
            setHasFileCURP_ALUMNO(false);
            return;
        }
    };
    const handleDeleteCURP_ALUMNO  = () => {
        setHasFileCURP_ALUMNO(false);
    };

    const [hasFileCURP_PADRE, setHasFileCURP_PADRE] = useState<boolean>(false);
    const [fileCURP_PADRE, setFileCURP_PADRE] = useState<File | undefined>();
    const handleChangeCURP_PADRE = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if(tempFile.size / 1024 > 15000){

                setHasFileCURP_PADRE(false);
                return;
            }
            else{
                setFileCURP_PADRE(tempFile);
                setHasFileCURP_PADRE(true);
            }
        }
        else{
            setHasFileCURP_PADRE(false);
            return;
        }
    };
    const handleDeleteCURP_PADRE = () => {
        setHasFileCURP_PADRE(false);
    };

    const [hasFileCURP_MADRE, setHasFileCURP_MADRE] = useState<boolean>(false);
    const [fileCURP_MADRE, setFileCURP_MADRE] = useState<File | undefined>();
    const handleChangeCURP_MADRE = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if(tempFile.size / 1024 > 15000){

                setHasFileCURP_MADRE(false);
                return;
            }
            else{
                setFileCURP_MADRE(tempFile);
                setHasFileCURP_MADRE(true);
            }
        }
        else{
            setHasFileCURP_MADRE(false);
            return;
        }
    };
    const handleDeleteCURP_MADRE = () => {
        setHasFileCURP_MADRE(false);
    };


    return (
        <div className={fileUploader.container}>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Acta de nacimiento</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileACTA_NACIMIENTO ?
                            <div className={fileUploader.uploadSection}>
                                <label htmlFor="file-input-ACTA_NACIMIENTO">
                                    <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp}/>
                                </label>
                                <input type="file" id="file-input-ACTA_NACIMIENTO" name="fileACTA_NACIMIENTO" accept="application/pdf" required onChange={handleChangeACTA_NACIMIENTO}/>
                                <div className={fileUploader.phantom}></div>
                            </div> :
                            <div className={fileUploader.uploadedSection}>
                                <div className={fileUploader.previewSection}>
                                    <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                    <div className={fileUploader.previewFileName}>
                                        {fileACTA_NACIMIENTO !== undefined ? fileACTA_NACIMIENTO.name : ""}
                                    </div>
                                </div>
                                <div>
                                    <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteACTA_NACIMIENTO}/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>CURP del alumno</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCURP_ALUMNO ?
                            <div className={fileUploader.uploadSection}>
                                <label htmlFor="file-input-CURP_ALUMNO">
                                    <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp}/>
                                </label>
                                <input type="file" id="file-input-CURP_ALUMNO" name="fileCURP_ALUMNO" accept="application/pdf" required onChange={handleChangeCURP_ALUMNO}/>
                                <div className={fileUploader.phantom}></div>
                            </div> :
                            <div className={fileUploader.uploadedSection}>
                                <div className={fileUploader.previewSection}>
                                    <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                    <div className={fileUploader.previewFileName}>
                                        {fileCURP_ALUMNO !== undefined ? fileCURP_ALUMNO.name : ""}
                                    </div>
                                </div>
                                <div>
                                    <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCURP_ALUMNO}/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>CURP del padre</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCURP_PADRE ?
                            <div className={fileUploader.uploadSection}>
                                <label htmlFor="file-input-CURP_PADRE">
                                    <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp}/>
                                </label>
                                <input type="file" id="file-input-CURP_PADRE" name="fileCURP_PADRE" accept="application/pdf" required onChange={handleChangeCURP_PADRE}/>
                                <div className={fileUploader.phantom}></div>
                            </div> :
                            <div className={fileUploader.uploadedSection}>
                                <div className={fileUploader.previewSection}>
                                    <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                    <div className={fileUploader.previewFileName}>
                                        {fileCURP_PADRE !== undefined ? fileCURP_PADRE.name : ""}
                                    </div>
                                </div>
                                <div>
                                    <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCURP_PADRE}/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>CURP de la madre</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCURP_MADRE ?
                            <div className={fileUploader.uploadSection}>
                                <label htmlFor="file-input-CURP_MADRE">
                                    <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp}/>
                                </label>
                                <input type="file" id="file-input-CURP_MADRE" name="fileCURP_MADRE" accept="application/pdf" required onChange={handleChangeCURP_MADRE}/>
                                <div className={fileUploader.phantom}></div>
                            </div> :
                            <div className={fileUploader.uploadedSection}>
                                <div className={fileUploader.previewSection}>
                                    <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                    <div className={fileUploader.previewFileName}>
                                        {fileCURP_MADRE !== undefined ? fileCURP_MADRE.name : ""}
                                    </div>
                                </div>
                                <div>
                                    <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCURP_MADRE}/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
        </div>
    )
}

export default FileUploader;