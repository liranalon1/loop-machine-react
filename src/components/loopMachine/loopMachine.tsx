import React, {useState} from 'react';
import './loopMachine.css'
import Control from "../../components/loopMachine/control/control";
import Pads from "../../components/loopMachine/pads/pads";
import track1 from "../../sounds/track1.mp3";
import track2 from "../../sounds/track2.mp3";
import track3 from "../../sounds/track3.mp3";
import track4 from "../../sounds/track4.mp3";
import track5 from "../../sounds/track5.mp3";
import track6 from "../../sounds/track6.mp3";
import track7 from "../../sounds/track7.mp3";
import track8 from "../../sounds/track8.mp3";
import track9 from "../../sounds/track9.mp3";

const loopMachine = () => {
    let pads = [
      {
        id: "e1",
        name:"Love Funk",
        sound: track1,
      },
      {
        id: "e2",
        name:"Zulu",
        sound: track2,
      },
      {
        id: "e3",
        name:"Holdme1",
        sound: track3,
      },
      {
        id: "e4",
        name:"Latint",
        sound: track4,
      },
      {
        id: "e5",
        name:"Pickcut",
        sound: track5,
      },
      {
        id: "e6",
        name:"Sun Synth Bass",
        sound: track6,
      },
      {
        id: "e7",
        name:"Kick Clap",
        sound: track7,
      },
      {
        id: "e8",
        name:"Track 8",
        sound: track8,
      },
      {
        id: "e9",
        name:"Track 9",
        sound: track9,
      },
    ];

    let selectedSounds = []

    const [machineIsOn, handleMachineActive] = useState(true);

    const disablePeds = pads.map(pad => (
      { 
        id: pad.id, 
        name: "", 
        sound: "",
      }
    ));

    const updatedPads = () => !machineIsOn ? disablePeds : pads;

    return (
    <div id="loop-machine" className={machineIsOn ? 'isOn' : ''}>
        <h1>Loop Machine</h1>
        <Control handleMachineActive={handleMachineActive} pads={pads} />
        <Pads items={updatedPads()} machineIsOn={machineIsOn} selectedSounds={selectedSounds} />
    </div>
    )
}

export default loopMachine;