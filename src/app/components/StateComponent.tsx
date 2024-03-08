'use client';

import page from "../Timeline/timeline.module.css"
import { nodeProperties } from '../types';
import FloatInfoButton from "./FloatInfoButton";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";



const StateComponent = ({ index, imgSrc, color }: nodeProperties) => {

    const titles: Array<string> = (["¿Ya nos conociste?", "Programa tu día prueba", "Adjunta y entrega tus documentos", "Pago presencial", "Lista de materiales", "Entrevista de bienvenida"]);
    const ref = useRef(null);



    const textLines = document.getElementById("lines");
    console.log(textLines)
    /* 
        useLayoutEffect(() => {
            console.log(ref.current.clientHeight);
        }, [ref])
    
     */

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
                            <span ref={ref} className={page.titles} > {titles[index - 2]} </span>
                            <FloatInfoButton />
                        </div>



                    </div>


                ) : (index < 8 &&

                    <div>
                        <div className={page.grayHollowCircle}>
                            {<Image className={page.images} src={imgSrc} alt="" ></Image>}
                        </div>

                        <div className={page.lowerElementsEmpty} >
                            <span className={page.titles}>{titles[index - 2]}</span>
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