import React from "react";
import "./App.css";
import Todolist from "./Components/Todolist";
import Count from "./Components/Count";

function App() {
  const [input, setInput] = React.useState([]); 
  const [count, setCount] = React.useState(0); 

  const saveData = (data) => {
    if (data.length > 0) {
      localStorage.setItem("list", JSON.stringify(data));
      console.log("Data saved:", data); 
    }
  };

  const getData = () => {
    const savedData = localStorage.getItem("list");
    console.log("Data retrieved:", savedData); 
    return savedData ? JSON.parse(savedData) : [];
  };
  React.useEffect(() => {
    const tasks = getData();
    console.log("Initial tasks from localStorage:", tasks); // Debugging
    setInput(tasks); // Initialize input state with saved tasks
    setCount(tasks.length); // Set the task count
  }, []); // Only runs once on initial mount

  // Save to localStorage when input changes
  React.useEffect(() => {
    saveData(input); // Save the updated tasks to localStorage
  }, [input]); // Trigger whenever input changes

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    let task = event.target.todo.value.trim(); // Trim to avoid leading/trailing spaces
    if (task) {
      setInput((prev) => [...prev, task]); // Add task to the input state
      setCount((prev) => prev + 1); // Increment task count
      event.target.todo.value = ""; // Clear the input field after submission
    }
  }

  // Function to delete a task
  function deleteFunction(taskToDelete) {
    setInput((prev) => {
      const updatedTasks = prev.filter((task) => task !== taskToDelete); // Remove task from the input state
      if (updatedTasks.length === 0) {
        localStorage.removeItem("list"); // Remove from localStorage if no tasks left
        console.log("Data removed from localStorage as all tasks are deleted");
      } else {
        saveData(updatedTasks); // Save updated tasks if there are tasks left
      }
      return updatedTasks;
    });

    setCount((prev) => prev - 1); // Decrease the task count
  }

  return (
    <div className="main">
      <form className="todolist" onSubmit={handleSubmit}>
        <input type="text" name="todo" placeholder="Enter your task" />
        <span className="span">
          <button className="button">Add Task</button>
        </span>
      </form>

      <div>
        {input.map((item, key) => (
          <Todolist
            task={item}
            id={key}
            key={key}
            deleteFunction={() => deleteFunction(item)} // Delete task by matching value
          />
        ))}
      </div>

      <Count number={count} />
    </div>
  );
}

export default App;
