'use client';

import page from "../Timeline/timeline.module.css"
import Image, { StaticImageData } from 'next/image';
import { nodeProperties } from '../types';
import { relative } from "path";



const StateComponent = ({index, imgSrc, color}: nodeProperties) =>{

    // blue text dictionary
    return(
        <>

            {(color !== "#FFFFFF" && index < 8)?
                (
                    <div className={page.hollowCircle2} style={{ "borderColor": color, position: 'relative'}}>
                        <span className={page.hollowCircle} style={{position: "absolute"}}>
                            {<Image className={page.images} src={imgSrc} alt="" ></Image>}
                        </span>

                    </div>
                ) : (index < 8 &&
                        <span className={page.hollowCircle} style={{ position: "relative" }}>
                        {<Image className={page.images} src={imgSrc} alt="" ></Image>}
                    </span>
                )

            }
            
            {index < 7 && 
                <div className={page.line}></div>
            }


            
        
        </>
    )
}

export default StateComponent;