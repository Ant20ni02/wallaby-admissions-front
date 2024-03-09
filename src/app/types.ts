import { StaticImageData } from "next/image"
import { Dispatch, SetStateAction, useState } from 'react';

export type nodeProperties = {
    index: number,
    imgSrc: StaticImageData,
    color: string
}

export type FileUploaderProps = {
    setDisplayFileUploaderModalWrap : Dispatch<SetStateAction<boolean>>
}
