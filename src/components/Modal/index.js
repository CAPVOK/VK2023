
import Button from "../Button";
import "./modal.css";

export default function Modal({ isOpen, onClose, date, timeStart, timeEnd, tower, floor, room }) {

    if (!isOpen) {
        return null;
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <p className="label">Вы успешно забронировали переговорную!</p>
                <div className="modal-body">
                    <p>{date.split('-').reverse().join('.')} c {timeStart} по {timeEnd}</p>
                    <p>Башня: {tower}</p>
                    <p>Этаж: {floor}</p>
                    <p>Переговорная: {room}</p>
                </div>
                <div className="modal-footer">
                    <Button callBack={onClose} label="Закрыть" color="#0077FF" />
                </div>
            </div>
        </div>
    );
};