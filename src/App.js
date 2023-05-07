import { useState } from 'react';

import { TextArea, DropDown, TimePicker, DatePicker, Button, } from './components';
import { response } from './api/Data';

import './App.css';

function App() {
  const [tower, setTower] = useState('');
  const [floor, setFloor] = useState('');
  const [room, setRoom] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [error, setError] = useState('');

  let towers = response.towers;
  let floors = response.floors;
  let rooms = response.rooms;
  let booked = response.booked;

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
    }

    if (isRoomAvailable(dateStart, dateEnd)) {

      const request = JSON.stringify({
        tower: tower, floor: floor, room: room,
        dateStart: dateStart, dateEnd: dateEnd,
      });

      console.log(request);
      setError("");
    } else {
      setError("Эта переговорная занята. Выберите другую.");
      return;
    }
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

  return (
    <>
      <form className="main" >
        <div className='sideBar' >
          <DropDown list={towers} label='Башня' placeHolder='Выберите башню:' callBack={setTower} value={tower} />
          <DropDown list={floors} label='Этаж' placeHolder='Выберите этаж:' callBack={setFloor} value={floor} />
          <DropDown list={rooms} label='Переговорная' placeHolder='Выберите переговорную:' callBack={setRoom} value={room} />
          <TimePicker label='Время начала' callBack={setTimeStart} value={timeStart} />
          <TimePicker label='Время конца' callBack={setTimeEnd} value={timeEnd} />
          <DatePicker label='Дата' callBack={setDate} value={date} />
        </div>
        <div className='form' >
          <TextArea callBack={setComment} value={comment} />
          <div className='formControl' >
            <div className='error' >{error}</div>
            <div className='buttons' >
              <Button label='Очистить' color='#FF3347' callBack={handleReset} />
              <Button label='Отправить' color='#0077FF' callBack={handleSubmit} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
