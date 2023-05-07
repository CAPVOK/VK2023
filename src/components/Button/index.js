import "./Button.css";

export default function Button({ callBack, label, color }) {

    return (
        <>
            <button
                onClick={callBack}
                type="button"
                className="Button"
                style={{ backgroundColor: color }}
            >
                {label}
            </button>
        </>
    )
}