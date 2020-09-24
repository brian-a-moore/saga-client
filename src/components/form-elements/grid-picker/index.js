import React, { useState, useRef, useEffect } from 'react';
import Grid from './grid';
import Portal from '../../containers/portal';
import { MdCropSquare, MdRemoveCircle } from 'react-icons/md';
import './style.css';

const DEFAULT_THEME = 'blue-500';

/*
USE CASE:
const checkTheme = (theme, getHex) => {
  if (getHex) {
    if (theme) return colors.find((color) => color.id === theme).hex;
    else return colors.find((color) => color.id === DEFAULT_THEME).hex;
  } else {
    if (theme) return colors.find((color) => color.id === theme);
    else return colors.find((color) => color.id === DEFAULT_THEME);
  }
};

const filteredColors = colors.filter((color) => !color.id.includes("-a"));
const DEFAULT_THEME = "blue-500";

  <GridPicker
    data={someData}
    defaultValue={checkTheme(theme, false) || someValue }
    type="color, font, mood, texture"
    requireDefault={true}
    onSelect={setTheme}
    />
*/

const GridPicker = ({ type, requireDefault, defaultValue, data, onSelect }) => {
    const [selection, setSelection] = useState(defaultValue || null);
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState(null);
    const thisPicker = useRef(null);

    const imageRenderer = () => {
        switch (type) {
            case 'color':
                return (
                    <span
                        className="swatch"
                        style={{ background: selection.hex }}
                    ></span>
                );
            case 'font':
                return (
                    <span
                        className="font-text"
                        style={{ fontFamily: selection.title }}
                    >
                        {' '}
                        Aa{' '}
                    </span>
                );
            case 'mood':
            case 'texture':
                return selection.id !== 'none' ? (
                    <img
                        src={require(`../../../static/${type}s/${selection.raw.toLowerCase()}.png`)}
                        alt={selection.title}
                    />
                ) : null;
            default:
                return null;
        }
    };

    const trigger = (item) => {
        onSelect(item ? item.id : null);
        setSelection(item);
    };

    const getCoordinates = ({ current }) => {
        if (current) {
            const rect = current.getBoundingClientRect();
            setCoords({
                left: rect.x,
                top: rect.y + window.scrollY + 40
            });
        }
    };

    useEffect(() => {
        if (open) getCoordinates(thisPicker);
    }, [open]);

    useEffect(() => {
        window.addEventListener('resize', () => getCoordinates(thisPicker));
        return () =>
            window.removeEventListener('resize', () =>
                getCoordinates(thisPicker)
            );
    }, []);

    return (
        <div className="grid-picker" ref={thisPicker}>
            <div className="picker">
                <div onClick={() => setOpen(!open)}>
                    <div className="img-container">
                        {selection ? (
                            imageRenderer()
                        ) : (
                            <MdCropSquare className="icon" />
                        )}
                    </div>
                    <span className="title">
                        {' '}
                        {selection
                            ? selection.title
                            : `Select ${
                                  type.slice(0, 1).toUpperCase() +
                                  type.slice(1, type.length)
                              }`}{' '}
                    </span>
                </div>
                <button
                    onClick={() =>
                        trigger(
                            requireDefault && type === 'color'
                                ? data.find(
                                      (color) => color.id === DEFAULT_THEME
                                  )
                                : null
                        )
                    }
                >
                    {' '}
                    <MdRemoveCircle className="icon" />{' '}
                </button>
            </div>
            {open ? (
                <Portal>
                    <Grid
                        items={data}
                        type={type}
                        onSelect={trigger}
                        setOpen={setOpen}
                        coords={coords}
                    />
                </Portal>
            ) : null}
        </div>
    );
};

export default GridPicker;
