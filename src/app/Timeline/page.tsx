"use client";
import page from "../Timeline/timeline.module.css"
import StateComponent from "../components/StateComponent";
import { nodeProperties } from '../types';

import schoolState1 from '/public/school-state1.png';
import sunState2 from '../../../public/sun-state2.png';
import fileState3 from '../../../public/files-state3.png';
import cardState4 from '../../../public/cards-state4.png';
import backpackStage5 from '../../../public/backpack-state5.png';
import formStage6 from '../../../public/form-stage6.png';
import { useEffect, useReducer, useState } from "react";
import { StaticImageData } from "next/image";

const Timeline = ({ }) => {

    const [properties, setProperties] = useState<Array<nodeProperties>>([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [nodeImages, setNodeImages] = useState<Array<StaticImageData>>([schoolState1, sunState2, fileState3, cardState4, backpackStage5, formStage6]);
    const [headerIsHidden, setHeaderIsHidden] = useState<boolean>(false); //header is shown initially
    const [display, setDisplay] = useState<string>("flex");

    const [textBoxIndex, setTextBoxIndex] = useState<number>(0);
    const [textBoxText, setTextBoxText] = useState<string>("");

    const currentText: Array<string> = [
        "Si te encuentras aquí, es porque ya participaste en nuestro tour. No olvides marcar la casilla de completado. Y recuerda, si tienes alguna duda, estamos aquí para ayudarte.",
        "Programa una cita para traer a tu pequeño a conocer Wallaby, donde realizaremos su diagnóstico escolar.",
        "En este espacio podrás adjuntar tus documentos de manera digital, pero recuerda que también es necesario entregarlos en físico en la escuela para completar el expediente.",
        "Realiza tu pago de manera presencial visitando nuestras instalaciones, donde nuestro equipo estará listo para asistirte en el proceso y resolver cualquier duda que puedas tener.",
        "Entrega a la escuela de la lista de materiales a utilizar durante el ciclo escolar, asegurando así que el alumno tenga acceso a ellos.",
        "Este último paso implica rellenar un formulario con información tanto tuya como de tu pequeño, asegurando así que tenemos todos los detalles necesarios."
    ]


    let dynamicProp: nodeProperties = { index: 0, color: "", imgSrc: schoolState1 }

    let color = "";

    const hideHeader = (param: boolean) => {
        setHeaderIsHidden(param);
    }

    const updateTextBoxIndex = (param: number) => {
        setTextBoxIndex(param);
    }

    useEffect(() => {
        setTextBoxText(currentText[textBoxIndex - 2])
    }, [textBoxIndex])

    useEffect(() => {
        headerIsHidden ? setDisplay("none") : setDisplay("flex");
        console.log(display);
    }, [headerIsHidden])

    useEffect(() => {

        const currentStatus: string = localStorage.getItem("status");
        let decoyValue: number = 0;

        switch (currentStatus) {
            case "DIA_PRUEBA":
                decoyValue = 2;
                break;
            case "ADJUNTAR_DOCUMENTOS":
                decoyValue = 3;
                break;
            case "VERIFICAR_DOCUMENTOS":
                decoyValue = 4;
                break;
            case "PAGO":
                decoyValue = 5;
                break;
            case "MATERIALES":
                decoyValue = 6;
                break;
            case "ENTREVISTA":
                decoyValue = 7;
                break;
        }


        color = "";
        for (let x = 2; x <= 7; x++) {
            //dynamicProp = {index : x, color : }

            if (x === decoyValue) { color = "#22629E"; }
            else {
                if (x <= decoyValue) {
                    color = "#39B54A";
                }

                else {
                    color = "#FFFFFF";
                }
            }



            dynamicProp = { index: x, color: color, imgSrc: nodeImages[x - 2] };

            let propertiesDecoy = properties;
            propertiesDecoy.push(dynamicProp);


            setProperties(propertiesDecoy);
            forceUpdate();
        }

    }, [])

    return (
        <>

            <div className={page.generalItemsWrap} >
                <img src="https://wallaby.edu.mx/wp-content/uploads/thegem-logos/logo_4c4b74d94dc18e7b988f3224ed408701_2x.png" alt="wallabyLogo" width="150em" />

                <div className={page.headerItemsWrap} style={{ "display": display }}>
                    <span className={page.headerText}> ¡Aquí inicia tu proceso de admisión!</span>
                    <span className={page.lowerText}>Comienza tu aventura siguiendo los pasos establecidos, y verás cómo tu progreso se marca con cada avance. Recuerda, ante cualquier duda, estamos aquí para apoyarte.</span>

                </div>


                <div className={page.statesWrap}>

                    {
                        properties.map((element: any, index) =>
                            <StateComponent key={element.key} mainProps={properties[index]} hideHeader={hideHeader} headerIsHidden={headerIsHidden} updateTextBoxIndex={updateTextBoxIndex} display={display} text={textBoxText} clickedIndex={textBoxIndex} />



                        )
                    }

                </div>

            </div>

        </>
    )
}

export default Timeline;