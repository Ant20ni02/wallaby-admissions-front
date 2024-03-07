'use client';

import page from "../Timeline/timeline.module.css"
import { nodeProperties } from '../types';
import FloatInfoButton from "./FloatInfoButton";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";



const StateComponent = ({ index, imgSrc, color }: nodeProperties) => {

    const titles: Array<string> = (["¿Ya nos conociste?", "Programa tu día prueba", "Adjunta y entrega tus documentos", "Pago presencial", "Lista de materiales", "Entrevista de bienvenida"]);
/* 
    const spanRef = useRef(null);
    const [numLines, setNumLines] = useState(0);

    useEffect(() => {
        const spanElement = spanRef.current;
        const divStyles = window.getComputedStyle(spanElement);
        const fontSize = parseFloat(divStyles.getPropertyValue('font-size'));
        const lineHeight = parseFloat(divStyles.getPropertyValue('line-height'));

        // Set span display to inline-block for accurate height measurement
        spanElement.style.display = 'inline-block';

        const spanHeight = spanElement.clientHeight;
        const calculatedNumLines = Math.ceil(spanHeight / lineHeight);
        setNumLines(calculatedNumLines);

        // Restore original display property after measurement
        spanElement.style.display = '';

    }, [titles]); */


    // blue text dictionary
    return (
        <>



            {(color !== "#FFFFFF" && index < 8) ?
                (
                    <div>
                        <div className={page.hollowCircle2} style={{ "borderColor": color, "position": "relative" }}>
                            <div className={page.hollowCircle} style={{ position: "absolute" }}>
                                {<Image className={page.images} src={imgSrc} alt="" ></Image>}
                            </div>

                        </div>

                        <div className={page.lowerElementsFull}>
                            <span>{titles[index - 2]}</span>
                            <FloatInfoButton />
                        </div>



                    </div>


                ) : (index < 8 &&

                    <div>
                        <div className={page.grayHollowCircle}>
                            {<Image className={page.images} src={imgSrc} alt="" ></Image>}
                        </div>

                        <div className={page.lowerElementsEmpty} >
                            <span >{titles[index - 2]}</span>
                            <FloatInfoButton />
                        </div>
                    </div>
                )

            }

            {(index < 7) &&
                ((color === "#39B54A") ?
                    (<div className={page.line} style={{ backgroundColor: "#39B54A" }} ></div>)
                    :
                    (<div className={page.line} style={{ backgroundColor: "#B8B9BB" }}></div>)
                )
            }





        </>
    )
}

export default StateComponent;