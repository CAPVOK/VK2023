import { useEffect, useState } from 'react';

import { TextArea, DropDown, TimePicker, DatePicker, Button, Modal, } from './components';
import { response } from './api/Data';

import './App.css';

function App() {
  const { towers, floors, rooms, booked } = response;

  const [tower, setTower] = useState('');
  const [floor, setFloor] = useState('');
  const [room, setRoom] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [error, setError] = useState('');
  const [availableRooms, setAvailableRooms] = useState(rooms);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!isValidForm()) {
      setError('Заполните все поля.');
      return;
    };

    let dateStart = new Date(`${date}T${timeStart}:00+03:00`);
    let dateEnd = new Date(`${date}T${timeEnd}:00+03:00`);

    if (!isValidTime(dateStart, dateEnd)) {
      setError('Время введено некорректно.');
      return;
    };

    if (isRoomAvailable(dateStart, dateEnd)) {
      const request = JSON.stringify({
        tower: tower, floor: floor, room: room,
        dateStart: dateStart, dateEnd: dateEnd,
      });
      console.log(request);
      setError("");
      setIsOpen(true);
    } else {
      setError("Эта переговорная занята. Выберите другую.");
      return;
    };
  };

  const handleReset = () => {
    setComment('');
    setDate('');
    setTimeEnd('');
    setTimeStart('');
    setFloor('');
    setRoom('');
    setTower('');
    setError('');
    setAvailableRooms(rooms);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const isValidForm = () => {
    return (tower && floor && room && date && timeStart && timeEnd);
  }

  const isValidTime = (dateStart, dateEnd) => {
    let curDate = new Date();
    return ((dateEnd.getTime() - dateStart.getTime()) > 0) && ((dateStart.getTime() - curDate.getTime()) > 0);
  }

  const isRoomAvailable = (dateStart, dateEnd) => {
    let isAvailable = true;
    booked.forEach((item) => {

      let roomDateStart = new Date(item.dateStart);
      let roomDateEnd = new Date(item.dateEnd);

      if (item.tower === tower && item.floor === floor && item.room === room &&
        roomDateStart.getFullYear() === dateStart.getFullYear()) {

        if (!(roomDateStart.getTime() >= dateEnd.getTime() || roomDateEnd.getTime() <= dateStart.getTime())) {
          isAvailable = false;
        }
      }
    });
    return isAvailable;
  }

  useEffect(() => {
    if (date && tower && floor && room && timeStart && timeEnd) {
      let dateStart = new Date(`${date}T${timeStart}:00+03:00`);
      let dateEnd = new Date(`${date}T${timeEnd}:00+03:00`);
      setAvailableRooms(rooms.filter((room) => {
        let ans = true;
        for (let item of booked) {
          let roomDateStart = new Date(item.dateStart);
          let roomDateEnd = new Date(item.dateEnd);
          if (item.tower === tower && item.floor === floor && item.room === room.value &&
            roomDateStart.getFullYear() === dateStart.getFullYear()) {
            if (!(roomDateStart.getTime() >= dateEnd.getTime() || roomDateEnd.getTime() <= dateStart.getTime())) {
              ans = false
            }
          }
        }
        return ans;
      }))
    }
  }, [date, tower, floor, room, timeStart, timeEnd]);

  return (
    <>
      <div className='main'>
        <Modal isOpen={isOpen} onClose={handleClose} date={date} timeStart={timeStart} timeEnd={timeEnd} tower={tower} floor={floor} room={room} />
        <form className="form" >
          <h1 className='formHeader'>Бронирование переговорной</h1>
          <div className='formBody'>
            <div className='formMenu' >
              <div className='inputs'>
                <DatePicker label='Дата' callBack={setDate} value={date} />
                <TimePicker label='Время начала' callBack={setTimeStart} value={timeStart} />
                <TimePicker label='Время конца' callBack={setTimeEnd} value={timeEnd} />
              </div>
              <div className='inputs'>
                <DropDown list={towers} label='Башня' placeHolder='Выберите башню:' callBack={setTower} value={tower} />
                <DropDown list={floors} label='Этаж' placeHolder='Выберите этаж:' callBack={setFloor} value={floor} />
                <DropDown list={availableRooms} label='Переговорная' placeHolder='Выберите переговорную:' callBack={setRoom} value={room} />
              </div>
            </div>
            <div className='formMenu' >
              <div className='menu'>
                <TextArea callBack={setComment} value={comment} />
                <div className='error' >{error}</div>
                <div className='buttons' >
                  <Button label='Очистить' color='#FF3347' callBack={handleReset} />
                  <Button label='Отправить' color='#0077FF' callBack={handleSubmit} />
                </div>
              </div>
              <div className='menu'>
                <img src='/images/meeting.gif' alt='meeting' className='gif' ></img>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
