import React, { useState } from 'react';
import './style.css';

const Tabs = ({ tabs }) => {
    const [ active, setActive ] = useState(0);

    if(tabs.length) {
        return(
            <div className='tabs'>
                { tabs.map((d, i) => (
                    <button className={ active === i ? 'active-tab' : null } style={{ width: `calc(100% / ${tabs.length})`}} key={i} onClick={() => setActive(i)}>
                        {d}
                    </button>
                )) }
                <div className='active-bar' style={{
                    width: `calc(100% / ${tabs.length})`,
                    left:  active *  (100 / tabs.length) + '%'
                }} />
            </div>
        );
    } else {
        return null;
    }
}

export default Tabs;