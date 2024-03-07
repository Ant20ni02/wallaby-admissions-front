"use client";
import FileUploader from '../components/FileUploader';
import testing from "./Testing.module.css"


const Testing = ({ }) => {

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <div className={testing.container}>
                <FileUploader/>
            </div>
        </div>
        
    )
}

export default Testing;