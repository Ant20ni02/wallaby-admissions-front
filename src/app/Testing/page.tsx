"use client";
import FileUploader from '../components/FileUploader';
import testing from "./Testing.module.css"


const Testing = ({ }) => {

    return (
        <>
            <div className={testing.blurScreen}>
                <FileUploader/>
            </div>
        </>
    )
}

export default Testing;