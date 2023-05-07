import "./TimePicker.css";

export default function TimePicker({ label, callBack, value }) {

    const handleChange = (e) => {
        callBack(e.target.value);
    };

    return (<>
        <div className="timePicker">
            <p >{label}</p>
            <input type="time" onChange={handleChange} value={value} id={label} />
        </div>
    </>)
}
