import React, {useState} from 'react';
import './control.css'

const control = (props: { handleMachineActive: (arg0: (prev: boolean) => boolean) => void; }) => {
    return (
    <div id="controlWrap">
        <div className="button r" id="button-1">
            <input type="checkbox" className="checkbox" defaultChecked={true} onChange={() => props.handleMachineActive((prev) => !prev)}/>
            <div className="knobs"></div>
            <div className="layer"></div>
        </div>
    </div>
    )
};

export default control;