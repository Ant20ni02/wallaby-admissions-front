import { StaticImageData } from "next/image"
import { Dispatch, SetStateAction, useState } from 'react';

export type nodeProperties = {
    index: number,
    imgSrc: StaticImageData,
    color: string,
}

export type nodeProps = {
    mainProps : nodeProperties,
    hideHeader: (param: boolean) => void,
    headerIsHidden: boolean,
    updateTextBoxIndex: (param: number) => void,
    display: string,
    text: string,
    clickedIndex: number,
    currentStatus: string,
    modalIsOpen: (param: boolean) => void,
}

export type floatButtonProps = {
    hideHeader: (param: boolean) => void,
    headerIsHidden: boolean,
    buttonIndex: number,
    updateTextBoxIndex: (param: number) => void,
    clickedIndex: number

}
export type FileUploaderProps = {
    setDisplayFileUploaderModalWrap : Dispatch<SetStateAction<boolean>>,
    changeUploadStatus: (param:boolean) => void
}
