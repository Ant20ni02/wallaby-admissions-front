'use client';

import page from "../Timeline/timeline.module.css"
import { nodeProperties, nodeProps } from '../types';
import FloatInfoButton from "./FloatInfoButton";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";



const StateComponent = ({ mainProps, hideHeader, headerIsHidden, updateTextBoxIndex, display, text, clickedIndex }: nodeProps) => {

    const titles: Array<string> = (["¿Ya nos conociste?", "Programa tu día prueba", "Adjunta y entrega tus documentos", "Pago presencial", "Lista de materiales", "Entrevista de bienvenida"]);

    // blue text dictionary
    return (
        <>



            {(mainProps.color !== "#FFFFFF" && mainProps.index < 8) ?
                (
                    <div>
                        <div className={page.hollowCircle2} style={{ "borderColor": mainProps.color, "position": "relative" }}>
                            <div className={page.hollowCircle} style={{ position: "absolute" }}>
                                {<Image className={page.images} src={mainProps.imgSrc} alt="" ></Image>}
                            </div>

                        </div>

                        <div className={page.lowerElementsFull}>
                            <span className={page.titles} > {titles[mainProps.index - 2]} </span>
                            <FloatInfoButton hideHeader={hideHeader} headerIsHidden={headerIsHidden} buttonIndex={mainProps.index} updateTextBoxIndex={updateTextBoxIndex} clickedIndex={clickedIndex} />


                            {(display === "none" && clickedIndex === mainProps.index) &&

                                <div className={page.infoBox}>{text}</div>

                            }

                        </div>
                    </div>


                ) : (mainProps.index < 8 &&

                    <div>
                        <div className={page.grayHollowCircle}>
                            {<Image className={page.images} src={mainProps.imgSrc} alt="" ></Image>}
                        </div>

                        <div className={page.lowerElementsEmpty} >
                            <span className={page.titles}>{titles[mainProps.index - 2]}</span>
                            <FloatInfoButton hideHeader={hideHeader} headerIsHidden={headerIsHidden} buttonIndex={mainProps.index} updateTextBoxIndex={updateTextBoxIndex} clickedIndex={clickedIndex} />

                            {(display === "none" && clickedIndex === mainProps.index) &&

                                <div className={page.infoBox}>{text}</div>

                            }

                        </div>
                    </div>
                )

            }

            {(mainProps.index < 7) &&
                ((mainProps.color === "#39B54A") ?
                    (<div className={page.line} style={{ backgroundColor: "#39B54A" }} ></div>)
                    :
                    (<div className={page.line} style={{ backgroundColor: "#B8B9BB" }}></div>)
                )
            }





        </>
    )
}

export default StateComponent;