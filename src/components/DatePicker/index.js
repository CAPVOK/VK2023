import './DatePicker.css';

export default function DatePicker({ label, callBack, value, }) {

    const handleChange = (e) => {
        callBack(e.target.value);
    };

    return (
        <div className="datePicker">
            <p>{label}</p>
            <input onChange={handleChange} type="date" value={value} />
        </div>
    )
}