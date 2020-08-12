import React, { useState } from 'react';
import Modal from '../components/containers/modal';
import GridPicker from '../components/form-elements/grid-picker';
import Slider from '../components/form-elements/slider';
import CheckBox from '../components/form-elements/check-box';
import { colors, fonts, moods, textures } from '../data';
import Tabs from '../components/controls/tabs';
import { Picker as TagPicker, Chips } from '../components/form-elements/tags';
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
    const [ theme, setTheme ] = useState('blue-500');
    const [ mode, setMode ] = useState('light');
    const [ backgroundColor, setBackgroundColor ] = useState(null);
    const [ color, setColor ] = useState(null);
    const [ font, setFont ] = useState(null);
    const [ mood, setMood ] = useState(null);
    const [ texture, setTexture ] = useState(null);
    const [ textureOpacity, setTextureOpacity ] = useState(100);
    const [ isDefault, setIsDefault ] = useState(false);
    const [ tags, setTags ] = useState([]);
    return(
        <div className={`app`} style={{ '--primaryColor': colors.find(color => color.id === theme).hex }}> 
            <Modal>
                <Tabs tabs={['Joy', 'Brian']} />
                <select defaultValue={mode} onChange={e => setMode(e.target.value)}>
                    <option value='light'> Light Mode </option>
                    <option value='dark'> Dark Mode </option>
                </select>
                <GridPicker data={filteredColors} defaultValue={colors.find(color => color.id === theme)} type='color' onSelect={setTheme} />
                <GridPicker data={filteredColors} defaultValue={backgroundColor} type='color' onSelect={setBackgroundColor} />
                <GridPicker data={filteredColors} defaultValue={color} type='color' onSelect={setColor} />
                <GridPicker data={fonts} defaultValue={font} type='font' onSelect={setFont} />
                <GridPicker data={moods} defaultValue={mood} type='mood' onSelect={setMood} />
                <GridPicker data={textures} defaultValue={texture} type='texture' onSelect={setTexture} />
                <Slider value={textureOpacity} defaultValue={textureOpacity} onChange={setTextureOpacity} />
                <CheckBox title='Set as Default' value={isDefault} defaultValue={isDefault} onChange={setIsDefault} />
                <TagPicker defaultTags={tags} availableTags={fakeTags} updateTags={setTags} />
                <Chips tags={fakeTags} />
            </Modal>
        </div>
    );
}

export default App;