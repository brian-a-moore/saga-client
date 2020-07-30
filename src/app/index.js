import React, { useState } from 'react';
import Modal from '../components/containers/modal';
import Picker from '../components/picker';
import { fonts, moods, textures } from '../data';
import './style.css';

const App = () => {
    const [ font, setFont ] = useState(null);
    const [ mood, setMood ] = useState({ id: 'happy', title: 'Happy', raw: 'happy' });
    const [ texture, setTexture ] = useState(null);
    return(
        <div className='app'>
            <Modal>
                <Picker data={fonts} defaultValue={font} type='font' onSelect={setFont} />
                <Picker data={moods} defaultValue={mood} type='mood' onSelect={setMood} />
                <Picker data={textures} defaultValue={texture} type='texture' onSelect={setTexture} />
            </Modal>
        </div>
    );
}

export default App;