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

  return (
    <div className="task">
      <div className="leftRightDisplayDiv">
        <h3 className="listTaskName">{props.title}</h3>
        <button className="smallBorderButton" onClick={removeTask}>
          {props.lang.removeTask}
        </button>
      </div>
      <h5 className="listTaskDate">{props.date.toLocaleString()}</h5>
    </div>
  );
}
