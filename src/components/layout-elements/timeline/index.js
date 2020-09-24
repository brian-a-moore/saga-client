import React, { useState, useRef } from 'react';
import { dateMap } from '../../../utils';
import './style.css';
import moment from 'moment';

const Timeline = (props) => {
    const timelineRef = useRef();
    const start = new Date('2012-02-23');
    const end = new Date('2020-07-18');
    let timeMap = dateMap(start, end);
    let today = [
        parseInt(moment().format('YYYY')),
        parseInt(moment().format('M'))
    ];
    let [displayDate, setDisplayDate] = useState(today);
    return (
        <div className="timeline" ref={timelineRef}>
            {timeMap.map((year, i) => (
                <Year
                    key={i}
                    data={year}
                    displayDate={displayDate}
                    setDisplayDate={setDisplayDate}
                />
            ))}
        </div>
    );
};

const Year = ({ data, displayDate, setDisplayDate }) => {
    let { year, months } = data;
    const setDefaultMonth = () => {
        if (year < displayDate[0])
            setDisplayDate([year, months[months.length - 1].monthNumber]);
        if (year > displayDate[0])
            setDisplayDate([year, months[0].monthNumber]);
    };
    return (
        <div className="timeline-year">
            <button onClick={setDefaultMonth}>{year}</button>
            <div
                className={`timeline-month-container${
                    displayDate[0] === year ? ' open' : ''
                }`}
            >
                {months.map((month, i) => (
                    <Month
                        key={i}
                        data={month}
                        displayDate={displayDate}
                        setDisplayDate={setDisplayDate}
                    />
                ))}
            </div>
        </div>
    );
};

const Month = ({ data, displayDate, setDisplayDate }) => {
    let { year, month, monthNumber } = data;
    return (
        <button
            onClick={() => {
                console.log({ year, monthNumber });
                setDisplayDate([year, monthNumber]);
            }}
            className={`timeline-display-month${
                displayDate[1] === monthNumber ? ' active' : ''
            }`}
        >
            <span> {month} </span>
        </button>
    );
};

export default Timeline;
