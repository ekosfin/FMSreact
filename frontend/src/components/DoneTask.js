import react from 'react';
import '../styles.css';
import {useHistory} from 'react-router-dom';

export default function doneTask(props) {
  function onReuseTaskClick() {
    props.setTaskTitle(props.title);
    props.goToNewTask();
  }

  return (
    <div className="task">
      <div className="leftRightDisplayDivBottomSpace">
        <h3 className="listTaskName">{props.title}</h3>
        <button className={'smallBorderButton'} onClick={onReuseTaskClick}>
          {props.lang.reUse}
        </button>
      </div>
      <h5 className="listTaskDate">{props.date.toLocaleString()}</h5>
    </div>
  );
}
