import PadItem from "./padItem";
import './pads.css'

const pads = (props: { items: { id: string; name: string; sound: string; }[]; machineIsOn: boolean; selectedSounds: []; }) =>{
    const pad = props.items.map(({ id, name, sound })=>{
      return <PadItem 
        key={id}
        id={id} 
        name={name}
        sound={sound}
        machineIsOn={props.machineIsOn}
        selectedSounds={props.selectedSounds}
    />
    });

    return (
        <div className="pads-wrap">
          {pad}
        </div>
    );
}

export default pads