import React, {useState} from 'react';

import './padItem.css';

const padItem = (props: { machineIsOn: boolean; selectedSounds: { id: string; }[]; sound: string; id: string | undefined; name: string; }) => {
  let [padIsActive, updateInActiveSatus] = useState(false);
  let [padInCue, updatePadInCue] = useState(false);

  const handlePad = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const padId = e.currentTarget.id;
    const selectedAudio = e.currentTarget.querySelector('audio');

    if(props.machineIsOn){
      handlePadsActive(padId, selectedAudio);
      handlePedClass(padId);
      handleSound(padId, selectedAudio)
    }
  }

  const handlePedClass = (padId) => {
    updateInActiveSatus(() => {
      if( idExist(padId) && props.selectedSounds.length === 1 ){
        return padIsActive ? false : true;
      }
    });

    updatePadInCue(() =>{
      return padInCue ? false : true;
    });
  }

  const idExist = (padId: string) => props.selectedSounds.some(({id}) => id === padId);
  const hasActive = () => props.selectedSounds.some(({isActive}) => isActive);
  const checkIfActiveExistOnce = () => props.selectedSounds.filter( ({isActive}) => isActive ).length === 1;

  const handlePadsActive = (padId: string, selectedAudio: object) => {
    if( !idExist(padId) ){
      addPadToActiveArry(padId, selectedAudio);
    }else{
      removePadFromActiveArry(padId);
    }
  }

  const addPadToActiveArry = (padId: string, selectedAudio: object) => {
    props.selectedSounds.push({ 
      id: padId,
      isActive: checkIfActiveExistOnce(padId) ? false : true, 
      selectedAudio: selectedAudio,
    })
  }

  const removePadFromActiveArry = (padId: string) => {
    for(let i in props.selectedSounds) {
      if (props.selectedSounds[i].id === padId) {
        props.selectedSounds.splice(i, 1);
        addActiveToTheNextSound();  //  if there is no active sound and the first that was playing was removed - add active to the next sound in the list
        break;
      }
    }    
  }

  const addActiveToTheNextSound = () => {
    if( props.selectedSounds.length && !hasActive() ){
      props.selectedSounds[0].isActive = true;
    }  
  }

  const handleSound = (padId: string, selectedAudio: { play: () => void; onended: () => void; currentTime: number; pause: () => void; }) => {
    if( idExist(padId) && props.selectedSounds.length === 1 ){
      selectedAudio.play();

      selectedAudio.onended = () =>{
        selectedAudio.currentTime = 0;
  
        for( let i in props.selectedSounds ){
          props.selectedSounds[i].selectedAudio.play();
        }
      }
    }
    else if( !idExist(padId) ){
      selectedAudio.pause();
      selectedAudio.currentTime = 0;
    }
  }

  return (
    // <div className={`pad ${checkIfActiveExistOnce() && props.selectedSounds.length === 1 ? 'active' : props.selectedSounds.some(({isActive}) => !isActive) ? 'inCue' : ''}`} id={props.id} onClick={(e) => handlePad(e)}>
    <div className={`pad ${padIsActive ? 'active' : padInCue ? 'inCue' : ''}`} id={props.id} onClick={(e) => handlePad(e)}>
      <span>{props.name}</span>
      <audio id="audio" src={props.sound}></audio>
    </div>
  );
}

export default padItem;