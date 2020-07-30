import React, { useState } from 'react';
import Modal from '../components/containers/modal';
import GridPicker from '../components/form-elements/grid-picker';
import { colors, fonts, moods, textures } from '../data';
import Tabs from '../components/controls/tabs';
import './style.css';

const App = () => {
    const [ backgroundColor, setBackgroundColor ] = useState(null);
    const [ color, setColor ] = useState(null);
    const [ font, setFont ] = useState(null);
    const [ mood, setMood ] = useState(null);
    const [ texture, setTexture ] = useState(null);
    return(
        <div className='app'> 
            <Modal>
                <Tabs tabs={['Joy', 'Brian']} />
                <GridPicker data={colors} defaultValue={backgroundColor} type='color' onSelect={setBackgroundColor} />
                <GridPicker data={colors} defaultValue={color} type='color' onSelect={setColor} />
                <GridPicker data={fonts} defaultValue={font} type='font' onSelect={setFont} />
                <GridPicker data={moods} defaultValue={mood} type='mood' onSelect={setMood} />
                <GridPicker data={textures} defaultValue={texture} type='texture' onSelect={setTexture} />
            </Modal>
        </div>
    );
}

export default App;