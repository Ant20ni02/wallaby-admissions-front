import floatbutton from './FloatInfoButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import plusvg from '../../../public/plus_svg.svg';
import Image from 'next/image';

const FloatInfoButton = ({ activateInsertCard }: any) => {

    const handleClick = () => {
        activateInsertCard(true);
    }
    return (
        <>
            <div className={floatbutton.buttonContainer} onClick={() => handleClick()}>
                <button className={floatbutton.FloatButton}>
                    <Image src={plusvg} alt="" className={floatbutton.plus} />
                </button>
            </div>
        </>
    )

}

export default FloatInfoButton;