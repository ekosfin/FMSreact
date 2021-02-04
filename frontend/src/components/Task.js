import react from 'react';
import '../styles.css';

export default function Post(props) {
  async function removeTask() {
    const bodyData = {
      _id: props.id,
    };

    const res = await fetch('http://localhost:5000/removetask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(bodyData),
    });
    const data = await res.json();
    if (props.onRemoved) {
      props.onRemoved();
    }
  }

  function urgentTaskTest() {
    let currentDate = new Date();
    let taskDate = props.date;
    const diffTime = Math.abs(taskDate - currentDate);
    const diffTimeHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (diffTimeHours < 48) {
      return 'urgentTask';
    } else {
      return 'task';
    }
  }

  function urgentButtonTest() {
    let currentDate = new Date();
    let taskDate = props.date;
    const diffTime = Math.abs(taskDate - currentDate);
    const diffTimeHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (diffTimeHours < 48) {
      return 'smallBorderButtonBlack';
    } else {
      return 'smallBorderButton';
    }
  }

  return (
    <div className={urgentTaskTest()}>
      <div className="leftRightDisplayDivBottomSpace">
        <h3 className="listTaskName">{props.title}</h3>
        <button className={'smallBorderButtonRed'} onClick={removeTask}>
          {props.lang.removeTask}
        </button>
      </div>
      <div className="leftRightDisplayDiv">
        <h5 className="listTaskDate">{props.date.toLocaleString()}</h5>
        <button className={urgentButtonTest()}>{props.lang.done}</button>
      </div>
    </div>
  );
}
