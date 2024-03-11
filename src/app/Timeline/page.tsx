"use client";
import page from "../Timeline/timeline.module.css"
import StateComponent from "../components/StateComponent";
import { nodeProperties } from '../types';
import schoolState1 from '/public/school-state1.png';
import sunState2 from '/public/sun-state2.png';
import fileState3 from '/public/files-state3.png';
import cardState4 from '/public/cards-state4.png';
import backpackStage5 from '/public/backpack-state5.png';
import formStage6 from '/public/form-stage6.png';
import { useEffect, useReducer, useState, useLayoutEffect } from "react";
import { StaticImageData } from "next/image";
import axios from "axios";
import FileUploader from '../components/FileUploader';

const Timeline = ({ }) => {

    const [properties, setProperties] = useState<Array<nodeProperties>>([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [nodeImages, setNodeImages] = useState<Array<StaticImageData>>([schoolState1, sunState2, fileState3, cardState4, backpackStage5, formStage6]);
    const [headerIsHidden, setHeaderIsHidden] = useState<boolean>(false); //header is shown initially
    const [display, setDisplay] = useState<string>("flex");

    const [textBoxIndex, setTextBoxIndex] = useState<number>(0);
    const [textBoxText, setTextBoxText] = useState<string>("");
    const [latestStatus, setLatestStatus] = useState<string>("");
    const [displayFileUploaderModalWrap, setDisplayFileUploaderModalWrap] = useState<boolean>(false);

    const [alreadyUploaded, setAlreadyUploaded] = useState<boolean>(false);

    const currentText: Array<string> = [
        "Si te encuentras aquí, es porque ya participaste en nuestro tour. Y recuerda, si tienes alguna duda, estamos aquí para ayudarte.",
        "Programa una cita para traer a tu pequeño a conocer Wallaby, donde realizaremos su diagnóstico escolar.",
        "En este espacio podrás adjuntar tus documentos de manera digital, pero recuerda que también es necesario entregarlos en físico en la escuela para completar el expediente.",
        "Realiza tu pago de manera presencial visitando nuestras instalaciones, donde nuestro equipo estará listo para asistirte en el proceso y resolver cualquier duda que puedas tener.",
        "Entrega a la escuela de la lista de materiales a utilizar durante el ciclo escolar, asegurando así que el alumno tenga acceso a ellos.",
        "Este último paso implica rellenar un formulario con información tanto tuya como de tu pequeño, asegurando así que tenemos todos los detalles necesarios."
    ]

    const hideHeader = (param: boolean) => {
        setHeaderIsHidden(param);
    }

    const updateTextBoxIndex = (param: number) => {
        setTextBoxIndex(param);
    }

    const modalIsOpen = (param: boolean) => {
        setDisplayFileUploaderModalWrap(param);
    }

    const changeUploadStatus = (param: boolean) => {
        setAlreadyUploaded(param);
    }

    const fillNodes = (curr: string) => {

        let decoyValue: number = 0;

        switch (curr) {
            case "DIA_PRUEBA":
                decoyValue = 0;
                break;
            case "ADJUNTAR_DOCUMENTOS":
                decoyValue = 1;
                break;
            case "VERIFICAR_DOCUMENTOS":
                decoyValue = 2;
                break;
            case "PAGO":
                decoyValue = 3;
                break;
            case "MATERIALES":
                decoyValue = 4;
                break;
            case "ENTREVISTA":
                decoyValue = 5;
                break;
        }

        //Something I'm not proud of at all but clock's ticking :(c
        const mapping: any = {
            0: [{ index: -1, color: "#39B54A", imgSrc: nodeImages[0] }, { index: 0, color: "#22629E", imgSrc: nodeImages[1] }, { index: 1, color: "#FFFFFF", imgSrc: nodeImages[2] }, { index: 2, color: "#FFFFFF", imgSrc: nodeImages[3] }, { index: 3, color: "#FFFFFF", imgSrc: nodeImages[4] }, { index: 4, color: "#FFFFFF", imgSrc: nodeImages[5] }],
            1: [{ index: -1, color: "#39B54A", imgSrc: nodeImages[0] }, { index: 0, color: "#39B54A", imgSrc: nodeImages[1] }, { index: 1, color: "#22629E", imgSrc: nodeImages[2] }, { index: 2, color: "#FFFFFF", imgSrc: nodeImages[3] }, { index: 3, color: "#FFFFFF", imgSrc: nodeImages[4] }, { index: 4, color: "#FFFFFF", imgSrc: nodeImages[5] }],
            2: [{ index: -1, color: "#39B54A", imgSrc: nodeImages[0] }, { index: 0, color: "#39B54A", imgSrc: nodeImages[1] }, { index: 1, color: "#22629E", imgSrc: nodeImages[2] }, { index: 2, color: "#FFFFFF", imgSrc: nodeImages[3] }, { index: 3, color: "#FFFFFF", imgSrc: nodeImages[4] }, { index: 4, color: "#FFFFFF", imgSrc: nodeImages[5] }],
            3: [{ index: -1, color: "#39B54A", imgSrc: nodeImages[0] }, { index: 0, color: "#39B54A", imgSrc: nodeImages[1] }, { index: 1, color: "#39B54A", imgSrc: nodeImages[2] }, { index: 2, color: "#22629E", imgSrc: nodeImages[3] }, { index: 3, color: "#FFFFFF", imgSrc: nodeImages[4] }, { index: 4, color: "#FFFFFF", imgSrc: nodeImages[5] }],
            4: [{ index: -1, color: "#39B54A", imgSrc: nodeImages[0] }, { index: 0, color: "#39B54A", imgSrc: nodeImages[1] }, { index: 1, color: "#39B54A", imgSrc: nodeImages[2] }, { index: 2, color: "#39B54A", imgSrc: nodeImages[3] }, { index: 3, color: "#22629E", imgSrc: nodeImages[4] }, { index: 4, color: "#FFFFFF", imgSrc: nodeImages[5] }],
            5: [{ index: -1, color: "#39B54A", imgSrc: nodeImages[0] }, { index: 0, color: "#39B54A", imgSrc: nodeImages[1] }, { index: 1, color: "#39B54A", imgSrc: nodeImages[2] }, { index: 2, color: "#39B54A", imgSrc: nodeImages[3] }, { index: 3, color: "#39B54A", imgSrc: nodeImages[4] }, { index: 4, color: "#22629E", imgSrc: nodeImages[5] }]
        };


        if (decoyValue >= 0 && decoyValue <= 5 && curr !== "") {
            setProperties(mapping[decoyValue]);
        }


    }


    useLayoutEffect(() => {
        localStorage.setItem("status", "VERIFICAR_DOCUMENTOS");
        setLatestStatus("VERIFICAR_DOCUMENTOS");
    }, [alreadyUploaded])


    useEffect(() => {
        setTextBoxText(currentText[textBoxIndex + 1])
    }, [textBoxIndex])

    useEffect(() => {
        headerIsHidden ? setDisplay("none") : setDisplay("flex");
        console.log(display);
    }, [headerIsHidden])

    useLayoutEffect(() => {

        const currentEmail: string = localStorage.getItem("email");
        let currentStatus: string = "";

        axios
            .get(`/api/getRowByEmail/${currentEmail}`)
            .then((response) => {
                currentStatus = response.data.row[33];
                setLatestStatus(currentStatus);

                fillNodes(currentStatus);

            })
            .catch((e) => {
                console.log(e);
                //route to login
            })

        forceUpdate();

    }, [])

    console.log(properties);

    return (
        <>

            <div style={{ "position": "relative", "zIndex": "3" }}>
                {displayFileUploaderModalWrap && <FileUploader setDisplayFileUploaderModalWrap={setDisplayFileUploaderModalWrap} changeUploadStatus={changeUploadStatus} />}
            </div>

            <div className={page.generalItemsWrap} >

                <img src="https://wallaby.edu.mx/wp-content/uploads/thegem-logos/logo_4c4b74d94dc18e7b988f3224ed408701_2x.png" alt="wallabyLogo" width="150em" />

                <div className={page.headerItemsWrap} style={{ "display": display }}>
                    <span className={page.headerText}> ¡Aquí inicia tu proceso de admisión!</span>
                    <span className={page.lowerText}>Comienza tu aventura siguiendo los pasos establecidos, y verás cómo tu progreso se marca con cada avance. Recuerda, ante cualquier duda, estamos aquí para apoyarte.</span>
                </div>


                <div className={page.statesWrap}>

                    {
                        properties.map((element: any, index) =>
                            <StateComponent key={element.key} mainProps={properties[index]} hideHeader={hideHeader} headerIsHidden={headerIsHidden} updateTextBoxIndex={updateTextBoxIndex} display={display} text={textBoxText} clickedIndex={textBoxIndex} currentStatus={latestStatus} modalIsOpen={modalIsOpen} />
                        )
                    }

                </div>

            </div>

        </>
    )
}

export default Timeline;