import { useEffect, useState, useRef } from 'react';
import './DropDown.css';

export default function DropDown({ list, label, placeHolder, callBack, value, tab }) {
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState(placeHolder);
    const dropDownRef = useRef(null);

    const handleClick = (e) => {
        setSelected(e.target.getAttribute('value'));
        setChecked(!checked);
        callBack(e.target.getAttribute('value'));
    }

    const handleClickOutside = (e) => {
        if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
            setChecked(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (value === '') {
            setSelected(placeHolder);
        };
    }, [value])

    return (
        <>
            <div className='dropDown' ref={dropDownRef}>
                <p>{label}</p>
                <div className='dropDown-menu'>
                    <input type='checkbox' id={label} tabIndex={tab} checked={checked} onChange={() => setChecked(!checked)} />
                    <label htmlFor={label} >{selected}</label>
                    <ul>
                        {list.map((item) => item.available &&
                            <li
                                onClick={handleClick}
                                key={item.value}
                                value={item.value}
                                style={selected === item.value ? { backgroundColor: "#eeeeee" } : {}}
                            >
                                {item.value}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}
