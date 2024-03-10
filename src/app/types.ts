import { StaticImageData } from "next/image"

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
}

export type floatButtonProps = {
    hideHeader: (param: boolean) => void,
    headerIsHidden: boolean,
    buttonIndex: number,
    updateTextBoxIndex: (param: number) => void,
    clickedIndex: number

}