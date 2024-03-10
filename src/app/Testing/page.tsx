"use client";
import FileUploader from '../components/FileUploader';
import testing from "./Testing.module.css"
import { useState } from 'react';


const Testing = ({ }) => {

    const [displayFileUploaderModalWrap, setDisplayFileUploaderModalWrap] = useState<boolean>(false);

    return (
        <>
            <div className={testing.modalWrap}>
                {displayFileUploaderModalWrap && <FileUploader setDisplayFileUploaderModalWrap={setDisplayFileUploaderModalWrap}/>}
            </div>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
            <button onClick={() => {setDisplayFileUploaderModalWrap(true)}}>Test Modal Wrap</button>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
        </>
    )
}

export default Testing;