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

    let dynamicProp: nodeProperties = { index: 0, color: "", imgSrc: schoolState1 }

    let color = "";


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
        console.log(currentStatus);
        console.log(decoyValue);

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

            console.log(propertiesDecoy);

            setProperties(propertiesDecoy);
            forceUpdate();
        }

    }, [])

    console.log(properties);

    return (
        <>

            <div className={page.generalItemsWrap}>
                <div className={page.headerItemsWrap}>
                    <img src="https://wallaby.edu.mx/wp-content/uploads/thegem-logos/logo_4c4b74d94dc18e7b988f3224ed408701_2x.png" alt="wallabyLogo" width="150em" />
                    <span className={page.headerText}> ¡Aquí inicia tu proceso de admisión!</span>

                </div>

                <span className={page.lowerText}>Comienza tu aventura siguiendo los pasos establecidos, y verás cómo tu progreso se marca con cada avance. Recuerda, ante cualquier duda, estamos aquí para apoyarte.</span>

                <div className={page.statesWrap}>

                    {
                        properties.map((element: any, index) =>
                            <StateComponent key={element.key} index={properties[index].index} imgSrc={properties[index].imgSrc} color={properties[index].color} />
                        
                        
                        
                            )
                    }

                </div>

            </div>

        </>
    )
}

export default Timeline;