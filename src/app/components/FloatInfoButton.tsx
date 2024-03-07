import floatbutton from './FloatInfoButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const FloatInfoButton = ({ activateInsertCard }: any) => {

    const handleClick = () => {
        activateInsertCard(true);
    }
    return (
        <>
            <div className={floatbutton.buttonContainer} onClick={() => handleClick()}>
                <button className={floatbutton.FloatButton}>
                    <FontAwesomeIcon icon={faPlus} className={floatbutton.plus} />
                </button>
            </div>
        </>
    )

}

export default FloatInfoButton;