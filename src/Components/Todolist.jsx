import React from "react";

const Todolist = (props) => {
  function handleClick(e) {
    props.deleteFunction(props.id);
  }

  return (
    <div className="todo-main">
      <div className="component-main">
        <ul>
          <li>
            {props.task}
            <span className="cross" onClick={handleClick}>
              ×
            </span>
          </li>{" "}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
