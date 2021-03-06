import React, { useState } from 'react';
import Modal from '../components/containers/modal';
import { colors } from '../data';
import Timeline from '../components/layout-elements/timeline';
import './style.css';

const DEFAULT_THEME = 'blue-500';

const checkTheme = (theme, getHex) => {
    if (getHex) {
        if (theme) return colors.find((color) => color.id === theme).hex;
        else return colors.find((color) => color.id === DEFAULT_THEME).hex;
    } else {
        if (theme) return colors.find((color) => color.id === theme);
        else return colors.find((color) => color.id === DEFAULT_THEME);
    }
};

const App = () => {
    const [theme] = useState(null);
    return (
        <div
            className={`app`}
            style={{
                '--primaryColor': checkTheme(theme, true)
            }}
        >
            <Modal>
                <Timeline />
            </Modal>
        </div>
    );
};

export default App;
