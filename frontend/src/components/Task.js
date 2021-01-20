import react from "react";

export default function Post(props) {
  async function removeTask() {
    const bodyData = {
      _id: props.id,
    };

    const res = await fetch("http://localhost:5000/removetask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
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
      <h3>{props.title}</h3>
      <h5>{props.date.toLocaleString()}</h5>
      <button onClick={removeTask}>Remove Task</button>
    </div>
  );
}
