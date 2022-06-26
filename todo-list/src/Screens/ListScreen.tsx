import React, { ChangeEvent, FormEvent, useState } from "react"
import { nanoid } from "nanoid"

type Props = {}

type Task = {
  id: string
  name: string
}

const ListScreen: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  /** get the value from input */
  const handleNewTaskValue = (e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)

  /** add new tasks */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTask !== "") {
      setTasks((tasks) => [...tasks, { id: nanoid(), name: newTask }])
      setNewTask("")
    }
  }

  /** delete tasks */
  const handleDelete = (handleTask: Task) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== handleTask.id))
  }

  /** check if the value of the input is already on the to-do lists */
  const sameValue = tasks.some((task) => task.name === newTask)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTask} onChange={handleNewTaskValue} />
        <button disabled={!newTask || sameValue === true} type="submit">
          Add task
        </button>
      </form>

      {/** list of tasks */}
      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <li>{task.name}</li>
            <button onClick={() => handleDelete(task)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ListScreen
