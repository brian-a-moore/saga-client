import React, { useState } from 'react';
import Modal from '../components/containers/modal';
import GridPicker from '../components/form-elements/grid-picker';
import Slider from '../components/form-elements/slider';
import CheckBox from '../components/form-elements/check-box';
import TagPicker from '../components/form-elements/tag-picker';
import { colors, fonts, moods, textures } from '../data';
import Tabs from '../components/controls/tabs';
import './style.css';

const fakeTags = [
    { id: 1, title: 'One' },
    { id: 2, title: 'Two' },
    { id: 3, title: 'Three' },
    { id: 4, title: 'Four' },
    { id: 5, title: 'Five' },
];

const filteredColors = colors.filter(color => (!color.id.includes('-a')));

const App = () => {
    const [ backgroundColor, setBackgroundColor ] = useState(null);
    const [ color, setColor ] = useState(null);
    const [ font, setFont ] = useState(null);
    const [ mood, setMood ] = useState(null);
    const [ texture, setTexture ] = useState(null);
    const [ textureOpacity, setTextureOpacity ] = useState(100);
    const [ isDefault, setIsDefault ] = useState(false);
    const [ tags, setTags ] = useState([]);
    return(
        <div className='app'> 
            <Modal>
                <Tabs tabs={['Joy', 'Brian']} />
                <GridPicker data={filteredColors} defaultValue={backgroundColor} type='color' onSelect={setBackgroundColor} />
                <GridPicker data={filteredColors} defaultValue={color} type='color' onSelect={setColor} />
                <GridPicker data={fonts} defaultValue={font} type='font' onSelect={setFont} />
                <GridPicker data={moods} defaultValue={mood} type='mood' onSelect={setMood} />
                <GridPicker data={textures} defaultValue={texture} type='texture' onSelect={setTexture} />
                <Slider value={textureOpacity} defaultValue={textureOpacity} onChange={setTextureOpacity} />
                <CheckBox title='Set as Default' value={isDefault} defaultValue={isDefault} onChange={setIsDefault} />
                <TagPicker value={tags} defaultValue={tags} tags={fakeTags} updateTags={setTags} />
            </Modal>
        </div>
    );
}

export default App;