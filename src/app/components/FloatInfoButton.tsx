import floatbutton from './FloatInfoButton.module.css';
import plusvg from '../../../public/plus_svg.svg';
import Image from 'next/image';
import { useState } from 'react';
import { floatButtonProps } from '../types';


const FloatInfoButton = ({ hideHeader, headerIsHidden, buttonIndex, updateTextBoxIndex, clickedIndex }: floatButtonProps) => {

    const [isHidden, setIsHidden] = useState<boolean>(headerIsHidden);

    const handleClick = () => {

        updateTextBoxIndex(buttonIndex);


        if (clickedIndex === buttonIndex && headerIsHidden) {
            hideHeader(false);
            setIsHidden(false);
        }
        else {

            hideHeader(true);
            setIsHidden(true);
        }
    }


    return (
        <>
            <div className={floatbutton.buttonContainer} >
                <button className={floatbutton.FloatButton} onClick={() => handleClick()}>
                    <Image src={plusvg} alt="" className={floatbutton.plus} />
                </button>
            </div>
        </>
    )

}

export default FloatInfoButton;