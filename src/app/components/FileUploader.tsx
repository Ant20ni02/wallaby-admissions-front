"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import fileUploader from "./fileuploader.module.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import { TailSpin } from 'react-loader-spinner'
import { FileUploaderProps } from '../types';

const FileUploader = ({ setDisplayFileUploaderModalWrap, changeUploadStatus }: FileUploaderProps) => {

    //change send icon to loading
    const [sending, setSending] = useState<boolean>(false);

    const [hasFileACTA_NACIMIENTO, setHasFileACTA_NACIMIENTO] = useState<boolean>(false);
    const [fileACTA_NACIMIENTO, setFileACTA_NACIMIENTO] = useState<File | undefined>();
    const handleChangeACTA_NACIMIENTO = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileACTA_NACIMIENTO(false);
                return;
            }
            else {
                setFileACTA_NACIMIENTO(tempFile);
                setHasFileACTA_NACIMIENTO(true);
            }
        }
        else {
            setHasFileACTA_NACIMIENTO(false);
            return;
        }
    };
    const handleDeleteACTA_NACIMIENTO = () => {
        setHasFileACTA_NACIMIENTO(false);
    };

    const [hasFileCURP_ALUMNO, setHasFileCURP_ALUMNO] = useState<boolean>(false);
    const [fileCURP_ALUMNO, setFileCURP_ALUMNO] = useState<File | undefined>();
    const handleChangeCURP_ALUMNO = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileCURP_ALUMNO(false);
                return;
            }
            else {
                setFileCURP_ALUMNO(tempFile);
                setHasFileCURP_ALUMNO(true);
            }
        }
        else {
            setHasFileCURP_ALUMNO(false);
            return;
        }
    };
    const handleDeleteCURP_ALUMNO = () => {
        setHasFileCURP_ALUMNO(false);
    };

    const [hasFileCURP_PADRE, setHasFileCURP_PADRE] = useState<boolean>(false);
    const [fileCURP_PADRE, setFileCURP_PADRE] = useState<File | undefined>();
    const handleChangeCURP_PADRE = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileCURP_PADRE(false);
                return;
            }
            else {
                setFileCURP_PADRE(tempFile);
                setHasFileCURP_PADRE(true);
            }
        }
        else {
            setHasFileCURP_PADRE(false);
            return;
        }
    };
    const handleDeleteCURP_PADRE = () => {
        setHasFileCURP_PADRE(false);
    };

    const [hasFileCURP_MADRE, setHasFileCURP_MADRE] = useState<boolean>(false);
    const [fileCURP_MADRE, setFileCURP_MADRE] = useState<File | undefined>();
    const handleChangeCURP_MADRE = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileCURP_MADRE(false);
                return;
            }
            else {
                setFileCURP_MADRE(tempFile);
                setHasFileCURP_MADRE(true);
            }
        }
        else {
            setHasFileCURP_MADRE(false);
            return;
        }
    };
    const handleDeleteCURP_MADRE = () => {
        setHasFileCURP_MADRE(false);
    };

    const [hasFileINE_PADRE, setHasFileINE_PADRE] = useState<boolean>(false);
    const [fileINE_PADRE, setFileINE_PADRE] = useState<File | undefined>();
    const handleChangeINE_PADRE = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileINE_PADRE(false);
                return;
            }
            else {
                setFileINE_PADRE(tempFile);
                setHasFileINE_PADRE(true);
            }
        }
        else {
            setHasFileINE_PADRE(false);
            return;
        }
    };
    const handleDeleteINE_PADRE = () => {
        setHasFileINE_PADRE(false);
    };

    const [hasFileINE_MADRE, setHasFileINE_MADRE] = useState<boolean>(false);
    const [fileINE_MADRE, setFileINE_MADRE] = useState<File | undefined>();
    const handleChangeINE_MADRE = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileINE_MADRE(false);
                return;
            }
            else {
                setFileINE_MADRE(tempFile);
                setHasFileINE_MADRE(true);
            }
        }
        else {
            setHasFileINE_MADRE(false);
            return;
        }
    };
    const handleDeleteINE_MADRE = () => {
        setHasFileINE_MADRE(false);
    };

    const [hasFileCARTA_NO_ADEUDO, setHasFileCARTA_NO_ADEUDO] = useState<boolean>(false);
    const [fileCARTA_NO_ADEUDO, setFileCARTA_NO_ADEUDO] = useState<File | undefined>();
    const handleChangeCARTA_NO_ADEUDO = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileCARTA_NO_ADEUDO(false);
                return;
            }
            else {
                setFileCARTA_NO_ADEUDO(tempFile);
                setHasFileCARTA_NO_ADEUDO(true);
            }
        }
        else {
            setHasFileCARTA_NO_ADEUDO(false);
            return;
        }
    };
    const handleDeleteCARTA_NO_ADEUDO = () => {
        setHasFileCARTA_NO_ADEUDO(false);
    };

    const [hasFileFOTOS, setHasFileFOTOS] = useState<boolean>(false);
    const [fileFOTOS, setFileFOTOS] = useState<File | undefined>();
    const handleChangeFOTOS = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileFOTOS(false);
                return;
            }
            else {
                setFileFOTOS(tempFile);
                setHasFileFOTOS(true);
            }
        }
        else {
            setHasFileFOTOS(false);
            return;
        }
    };
    const handleDeleteFOTOS = () => {
        setHasFileFOTOS(false);
    };

    const [hasFileCARTILLA_VACUNACION, setHasFileCARTILLA_VACUNACION] = useState<boolean>(false);
    const [fileCARTILLA_VACUNACION, setFileCARTILLA_VACUNACION] = useState<File | undefined>();
    const handleChangeCARTILLA_VACUNACION = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileCARTILLA_VACUNACION(false);
                return;
            }
            else {
                setFileCARTILLA_VACUNACION(tempFile);
                setHasFileCARTILLA_VACUNACION(true);
            }
        }
        else {
            setHasFileCARTILLA_VACUNACION(false);
            return;
        }
    };
    const handleDeleteCARTILLA_VACUNACION = () => {
        setHasFileCARTILLA_VACUNACION(false);
    };

    const [hasFilePRUEBA_LABORATORIO, setHasFilePRUEBA_LABORATORIO] = useState<boolean>(false);
    const [filePRUEBA_LABORATORIO, setFilePRUEBA_LABORATORIO] = useState<File | undefined>();
    const handleChangePRUEBA_LABORATORIO = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFilePRUEBA_LABORATORIO(false);
                return;
            }
            else {
                setFilePRUEBA_LABORATORIO(tempFile);
                setHasFilePRUEBA_LABORATORIO(true);
            }
        }
        else {
            setHasFilePRUEBA_LABORATORIO(false);
            return;
        }
    };
    const handleDeletePRUEBA_LABORATORIO = () => {
        setHasFilePRUEBA_LABORATORIO(false);
    };

    const [hasFileVACUNA_COVID, setHasFileVACUNA_COVID] = useState<boolean>(false);
    const [fileVACUNA_COVID, setFileVACUNA_COVID] = useState<File | undefined>();
    const handleChangeVACUNA_COVID = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileVACUNA_COVID(false);
                return;
            }
            else {
                setFileVACUNA_COVID(tempFile);
                setHasFileVACUNA_COVID(true);
            }
        }
        else {
            setHasFileVACUNA_COVID(false);
            return;
        }
    };
    const handleDeleteVACUNA_COVID = () => {
        setHasFileVACUNA_COVID(false);
    };

    const [hasFileCARTA_BUENA_SALUD, setHasFileCARTA_BUENA_SALUD] = useState<boolean>(false);
    const [fileCARTA_BUENA_SALUD, setFileCARTA_BUENA_SALUD] = useState<File | undefined>();
    const handleChangeCARTA_BUENA_SALUD = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileCARTA_BUENA_SALUD(false);
                return;
            }
            else {
                setFileCARTA_BUENA_SALUD(tempFile);
                setHasFileCARTA_BUENA_SALUD(true);
            }
        }
        else {
            setHasFileCARTA_BUENA_SALUD(false);
            return;
        }
    };
    const handleDeleteCARTA_BUENA_SALUD = () => {
        setHasFileCARTA_BUENA_SALUD(false);
    };

    const [hasFileEXUDADO_BUCOFARINGEO, setHasFileEXUDADO_BUCOFARINGEO] = useState<boolean>(false);
    const [fileEXUDADO_BUCOFARINGEO, setFileEXUDADO_BUCOFARINGEO] = useState<File | undefined>();
    const handleChangeEXUDADO_BUCOFARINGEO = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileEXUDADO_BUCOFARINGEO(false);
                return;
            }
            else {
                setFileEXUDADO_BUCOFARINGEO(tempFile);
                setHasFileEXUDADO_BUCOFARINGEO(true);
            }
        }
        else {
            setHasFileEXUDADO_BUCOFARINGEO(false);
            return;
        }
    };
    const handleDeleteEXUDADO_BUCOFARINGEO = () => {
        setHasFileEXUDADO_BUCOFARINGEO(false);
    };

    const [hasFileCONSTANCIA_ANO_CURSADO, setHasFileCONSTANCIA_ANO_CURSADO] = useState<boolean>(false);
    const [fileCONSTANCIA_ANO_CURSADO, setFileCONSTANCIA_ANO_CURSADO] = useState<File | undefined>();
    const handleChangeCONSTANCIA_ANO_CURSADO = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileCONSTANCIA_ANO_CURSADO(false);
                return;
            }
            else {
                setFileCONSTANCIA_ANO_CURSADO(tempFile);
                setHasFileCONSTANCIA_ANO_CURSADO(true);
            }
        }
        else {
            setHasFileCONSTANCIA_ANO_CURSADO(false);
            return;
        }
    };
    const handleDeleteCONSTANCIA_ANO_CURSADO = () => {
        setHasFileCONSTANCIA_ANO_CURSADO(false);
    };

    const [hasFileBOLETA, setHasFileBOLETA] = useState<boolean>(false);
    const [fileBOLETA, setFileBOLETA] = useState<File | undefined>();
    const handleChangeBOLETA = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileBOLETA(false);
                return;
            }
            else {
                setFileBOLETA(tempFile);
                setHasFileBOLETA(true);
            }
        }
        else {
            setHasFileBOLETA(false);
            return;
        }
    };
    const handleDeleteBOLETA = () => {
        setHasFileBOLETA(false);
    };

    const [hasFileBUENA_CONDUCTA, setHasFileBUENA_CONDUCTA] = useState<boolean>(false);
    const [fileBUENA_CONDUCTA, setFileBUENA_CONDUCTA] = useState<File | undefined>();
    const handleChangeBUENA_CONDUCTA = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const tempFile = e.target.files[0];
            if (tempFile.size / 1024 > 15000) {

                setHasFileBUENA_CONDUCTA(false);
                return;
            }
            else {
                setFileBUENA_CONDUCTA(tempFile);
                setHasFileBUENA_CONDUCTA(true);
            }
        }
        else {
            setHasFileBUENA_CONDUCTA(false);
            return;
        }
    };
    const handleDeleteBUENA_CONDUCTA = () => {
        setHasFileBUENA_CONDUCTA(false);
    };

    const handleSubmission = async () => {
        const row = localStorage.getItem('index');
        const studentName = localStorage.getItem('name');

        if (row !== null && studentName !== null) {

            const formData = new FormData();
            formData.append("row", row);
            formData.append("studentName", studentName);

            formData.append("ACTA_NACIMIENTO", fileACTA_NACIMIENTO);
            formData.append("CURP_ALUMNO", fileCURP_ALUMNO);
            formData.append("CURP_PADRE", fileCURP_PADRE);
            formData.append("CURP_MADRE", fileCURP_MADRE);
            formData.append("INE_PADRE", fileINE_PADRE);
            formData.append("INE_MADRE", fileINE_MADRE);
            formData.append("CARTA_NO_ADEUDO", fileCARTA_NO_ADEUDO);
            formData.append("FOTOS", fileFOTOS);
            formData.append("CARTILLA_VACUNACION", fileCARTILLA_VACUNACION);
            formData.append("PRUEBA_LABORATORIO", filePRUEBA_LABORATORIO);
            formData.append("VACUNA_COVID", fileVACUNA_COVID);
            formData.append("CARTA_BUENA_SALUD", fileCARTA_BUENA_SALUD);
            formData.append("EXUDADO_BUCOFARINGEO", fileEXUDADO_BUCOFARINGEO);

            if (hasFileCONSTANCIA_ANO_CURSADO) {
                formData.append("CONSTANCIA_ANO_CURSADO", fileCONSTANCIA_ANO_CURSADO);
            }

            if (hasFileBOLETA) {
                formData.append("BOLETA", fileBOLETA);
            }

            if (hasFileBUENA_CONDUCTA) {
                formData.append("BUENA_CONDUCTA", fileBUENA_CONDUCTA);
            }

            try {
                const res = await axios.post(
                    '/api/uploadToDrive',
                    formData
                );

                const Toast = Swal.mixin({
                    showConfirmButton: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    },
                    willClose: () => {

                        setSending(false);
                        setHasFileACTA_NACIMIENTO(false);
                        setHasFileCURP_ALUMNO(false);
                        setHasFileCURP_PADRE(false);
                        setHasFileCURP_MADRE(false);
                        setHasFileINE_PADRE(false);
                        setHasFileINE_MADRE(false);
                        setHasFileCARTA_NO_ADEUDO(false);
                        setHasFileFOTOS(false);
                        setHasFileCARTILLA_VACUNACION(false);
                        setHasFilePRUEBA_LABORATORIO(false);
                        setHasFileVACUNA_COVID(false);
                        setHasFileCARTA_BUENA_SALUD(false);
                        setHasFileEXUDADO_BUCOFARINGEO(false);
                        setHasFileCONSTANCIA_ANO_CURSADO(false);
                        setHasFileBOLETA(false);
                        setHasFileBUENA_CONDUCTA(false);
                        setDisplayFileUploaderModalWrap(false);
                        clearInterval(1500);

                        //documents have been successfully uploaded -> update status locally
                        changeUploadStatus(true);
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Se han mandado los archivos exitosamente',
                    text: 'Asiste fisicamente a las instalaciones para verificar tus documentos originales'
                })
            }
            catch (e: any) {
                console.error(e);
                const Toast = Swal.mixin({
                    showConfirmButton: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    },
                    willClose: () => {
                        clearInterval(1500)
                    }
                })

                Toast.fire({
                    icon: 'error',
                    title: 'Hubo un fallo al mandar los archivos',
                    text: 'Intenta de nuevo'
                })
            }
        }
        else {
            const Toast = Swal.mixin({
                showConfirmButton: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                },
                willClose: () => {
                    clearInterval(1500)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Hubo un fallo al mandar los archivos',
                text: 'Intenta de nuevo'
            })
        }

        setSending(false);
        setHasFileACTA_NACIMIENTO(false);
        setHasFileCURP_ALUMNO(false);
        setHasFileCURP_PADRE(false);
        setHasFileCURP_MADRE(false);
        setHasFileINE_PADRE(false);
        setHasFileINE_MADRE(false);
        setHasFileCARTA_NO_ADEUDO(false);
        setHasFileFOTOS(false);
        setHasFileCARTILLA_VACUNACION(false);
        setHasFilePRUEBA_LABORATORIO(false);
        setHasFileVACUNA_COVID(false);
        setHasFileCARTA_BUENA_SALUD(false);
        setHasFileEXUDADO_BUCOFARINGEO(false);
        setHasFileCONSTANCIA_ANO_CURSADO(false);
        setHasFileBOLETA(false);
        setHasFileBUENA_CONDUCTA(false);
    };

    const onCloseClick = () => {
        if (!sending) {
            setDisplayFileUploaderModalWrap(false);
        }
    }

    return (
        <div className={fileUploader.blurBackground}>
            <div className={fileUploader.container}>
                <div className={fileUploader.exitContainer}>
                    <div>
                        <FontAwesomeIcon onClick={onCloseClick} icon={faXmark} className={fileUploader.exitIcon} />
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.title}>
                        Cargar documento
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Acta de nacimiento*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileACTA_NACIMIENTO ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-ACTA_NACIMIENTO">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-ACTA_NACIMIENTO" name="fileACTA_NACIMIENTO" accept="application/pdf" required onChange={handleChangeACTA_NACIMIENTO} />
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
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteACTA_NACIMIENTO} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>CURP del alumno*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCURP_ALUMNO ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-CURP_ALUMNO">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-CURP_ALUMNO" name="fileCURP_ALUMNO" accept="application/pdf" required onChange={handleChangeCURP_ALUMNO} />
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
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCURP_ALUMNO} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>CURP del padre*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCURP_PADRE ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-CURP_PADRE">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-CURP_PADRE" name="fileCURP_PADRE" accept="application/pdf" required onChange={handleChangeCURP_PADRE} />
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
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCURP_PADRE} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>CURP de la madre*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCURP_MADRE ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-CURP_MADRE">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-CURP_MADRE" name="fileCURP_MADRE" accept="application/pdf" required onChange={handleChangeCURP_MADRE} />
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
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCURP_MADRE} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>INE del padre*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileINE_PADRE ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-INE_PADRE">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-INE_PADRE" name="fileINE_PADRE" accept="application/pdf" required onChange={handleChangeINE_PADRE} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileINE_PADRE !== undefined ? fileINE_PADRE.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteINE_PADRE} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>INE de la madre*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileINE_MADRE ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-INE_MADRE">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-INE_MADRE" name="fileINE_MADRE" accept="application/pdf" required onChange={handleChangeINE_MADRE} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileINE_MADRE !== undefined ? fileINE_MADRE.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteINE_MADRE} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Carta de no adeudo*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCARTA_NO_ADEUDO ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-CARTA_NO_ADEUDO">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-CARTA_NO_ADEUDO" name="fileCARTA_NO_ADEUDO" accept="application/pdf" required onChange={handleChangeCARTA_NO_ADEUDO} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileCARTA_NO_ADEUDO !== undefined ? fileCARTA_NO_ADEUDO.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCARTA_NO_ADEUDO} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Fotos*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileFOTOS ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-FOTOS">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-FOTOS" name="fileFOTOS" accept="application/pdf" required onChange={handleChangeFOTOS} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileFOTOS !== undefined ? fileFOTOS.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteFOTOS} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Cartilla de vacunación*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCARTILLA_VACUNACION ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-CARTILLA_VACUNACION">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-CARTILLA_VACUNACION" name="fileCARTILLA_VACUNACION" accept="application/pdf" required onChange={handleChangeCARTILLA_VACUNACION} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileCARTILLA_VACUNACION !== undefined ? fileCARTILLA_VACUNACION.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCARTILLA_VACUNACION} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Prueba de laboratorio*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFilePRUEBA_LABORATORIO ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-PRUEBA_LABORATORIO">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-PRUEBA_LABORATORIO" name="filePRUEBA_LABORATORIO" accept="application/pdf" required onChange={handleChangePRUEBA_LABORATORIO} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {filePRUEBA_LABORATORIO !== undefined ? filePRUEBA_LABORATORIO.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeletePRUEBA_LABORATORIO} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Certificado de vacunación contra la COVID-19*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileVACUNA_COVID ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-VACUNA_COVID">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-VACUNA_COVID" name="fileVACUNA_COVID" accept="application/pdf" required onChange={handleChangeVACUNA_COVID} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileVACUNA_COVID !== undefined ? fileVACUNA_COVID.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteVACUNA_COVID} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Carta de buena salud*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCARTA_BUENA_SALUD ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-CARTA_BUENA_SALUD">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-CARTA_BUENA_SALUD" name="fileCARTA_BUENA_SALUD" accept="application/pdf" required onChange={handleChangeCARTA_BUENA_SALUD} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileCARTA_BUENA_SALUD !== undefined ? fileCARTA_BUENA_SALUD.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCARTA_BUENA_SALUD} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Exudado bucofaringeo*</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileEXUDADO_BUCOFARINGEO ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-EXUDADO_BUCOFARINGEO">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-EXUDADO_BUCOFARINGEO" name="fileEXUDADO_BUCOFARINGEO" accept="application/pdf" required onChange={handleChangeEXUDADO_BUCOFARINGEO} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileEXUDADO_BUCOFARINGEO !== undefined ? fileEXUDADO_BUCOFARINGEO.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteEXUDADO_BUCOFARINGEO} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Constancia de año cursado</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileCONSTANCIA_ANO_CURSADO ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-CONSTANCIA_ANO_CURSADO">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-CONSTANCIA_ANO_CURSADO" name="fileCONSTANCIA_ANO_CURSADO" accept="application/pdf" required onChange={handleChangeCONSTANCIA_ANO_CURSADO} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileCONSTANCIA_ANO_CURSADO !== undefined ? fileCONSTANCIA_ANO_CURSADO.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteCONSTANCIA_ANO_CURSADO} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Boleta de calificaciones</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileBOLETA ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-BOLETA">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-BOLETA" name="fileBOLETA" accept="application/pdf" required onChange={handleChangeBOLETA} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileBOLETA !== undefined ? fileBOLETA.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteBOLETA} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className={fileUploader.innerContainer}>
                    <div className={fileUploader.fileName}>Carta de buena conducta</div>
                    <div className={fileUploader.fileContainer}>
                        {
                            !hasFileBUENA_CONDUCTA ?
                                <div className={fileUploader.uploadSection}>
                                    <label htmlFor="file-input-BUENA_CONDUCTA">
                                        <FontAwesomeIcon className={fileUploader.uploadIcon} icon={faCloudArrowUp} />
                                    </label>
                                    <input type="file" id="file-input-BUENA_CONDUCTA" name="fileBUENA_CONDUCTA" accept="application/pdf" required onChange={handleChangeBUENA_CONDUCTA} />
                                    <div className={fileUploader.phantom}></div>
                                </div> :
                                <div className={fileUploader.uploadedSection}>
                                    <div className={fileUploader.previewSection}>
                                        <img className={fileUploader.preview} src={"/file.png"} alt="Your file" />
                                        <div className={fileUploader.previewFileName}>
                                            {fileBUENA_CONDUCTA !== undefined ? fileBUENA_CONDUCTA.name : ""}
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={fileUploader.deleteIcon} icon={faTrashCan} onClick={handleDeleteBUENA_CONDUCTA} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                {
                    !sending ?
                        <div className={fileUploader.buttonContainer}>
                            {
                                hasFileACTA_NACIMIENTO && hasFileCURP_ALUMNO && hasFileCURP_PADRE && hasFileCURP_MADRE && hasFileINE_PADRE && hasFileINE_MADRE && hasFileCARTA_NO_ADEUDO && hasFileFOTOS && hasFileCARTILLA_VACUNACION && hasFilePRUEBA_LABORATORIO && hasFileVACUNA_COVID && hasFileCARTA_BUENA_SALUD && hasFileEXUDADO_BUCOFARINGEO ?
                                    <button className={fileUploader.revisionButton} onClick={() => { handleSubmission(); setSending(true) }}>Mandar a revisión</button> :
                                    <div className={fileUploader.disabledButtonContainer}>
                                        <button className={fileUploader.revisionButtonWaiting} disabled={false}>Mandar a revisión</button>
                                        <p className={fileUploader.displayText}>Faltan archivos obligatorios por subir</p>
                                    </div>
                            }
                        </div> :
                        <div className={fileUploader.buttonContainer}>
                            <TailSpin
                                height="50"
                                width="50"
                                color="#2666BE"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                }
            </div>
        </div>
    )
}

export default FileUploader;