"use client";

import React, { useState, useEffect } from 'react';
import page from "../Timeline/timeline.module.css"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import schoolState1 from '../../../public/school-state1.png';
import sunState2 from '../../../public/sun-state2.png';
import fileState3 from '../../../public/files-state3.png';
import cardState4 from '../../../public/cards-state4.png';
import backpackStage5 from '../../../public/backpack-state5.png';
import formStage6 from '../../../public/form-stage6.png';



const Timeline = ({ }) => {

    const router = useRouter();

    return (
        <>
            <div className={page.topBand}></div>

            <div className={page.generalItemsWrap}>
                <div className={page.headerItemsWrap}>

                    <span className={page.headerText}> ¡Bienvenidos al proceso de admisión de      </span>
                    <img src="https://wallaby.edu.mx/wp-content/uploads/thegem-logos/logo_4c4b74d94dc18e7b988f3224ed408701_2x.png" alt="wallabyLogo" width="120em" />
                    <span className={page.headerText}>!</span>

                </div>

                <span className={page.lowerText}>Comienza tu aventura siguiendo los pasos establecidos, y verás cómo tu progreso se marca con cada avance. Recuerda, ante cualquier duda, estamos aquí para apoyarte.</span>

                <div className={page.statesWrap}>

                    <span className={page.hollowCircle}>
                        <Image className={page.images} src={schoolState1} alt="school-state1" ></Image>
                    </span>

                    <div className={page.line}></div>

                    <span className={page.hollowCircle}>
                        <Image className={page.images} src={sunState2} alt="school-state1" ></Image>
                    </span>

                    <div className={page.line}></div>

                    <span className={page.hollowCircle}>
                        <Image className={page.images} src={fileState3} alt="school-state1" ></Image>
                    </span>

                    <div className={page.line}></div>

                    <span className={page.hollowCircle}>
                        <Image className={page.images} src={cardState4} alt="school-state1" ></Image>
                    </span>

                    <div className={page.line}></div>

                    <span className={page.hollowCircle}>
                        <Image className={page.images} src={backpackStage5} alt="school-state1" ></Image>
                    </span>

                    <div className={page.line}></div>

                    <span className={page.hollowCircle}>
                        <Image className={page.images} src={formStage6} alt="school-state1" ></Image>
                    </span>

                </div>

            </div>

            <div className={page.bottomBand}></div>


        </>
    )
}

export default Timeline;

