import './TextArea.css'

export default function TextArea ({callBack, value}) {

    const handleChange = (e) => {
        callBack(e.target.value);
    }

    return (<>
        <div className="textArea">
            <p>Комментарий</p>
            <textarea onChange={handleChange} type="text" value={value} placeholder="Введите комментарий"/>
        </div>    
    </>)
}