import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { nanoid } from "nanoid"

type Props = {}

type Task = {
  id: string
  name: string
  date: string
}

const ListScreen: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [dayTime, setDayTime] = useState("")

  /** get the value from input */
  const handleNewTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value)
  }

  useEffect(() => {
    const today = new Date()
    const date = today.getDate() + ". " + (today.getMonth() + 1) + ". " + today.getFullYear()
    const time = today.getHours() + ":" + today.getMinutes()
    const dateTimeFormat = date + " " + time
    setDayTime(dateTimeFormat)
  }, [tasks])

  /** add new tasks */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTasks((tasks) => [...tasks, { id: nanoid(), name: newTask, date: dayTime }])
    setNewTask("")
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
            <li>
              <span>{task.name}</span> <span>{task.date}</span>
              <button onClick={() => handleDelete(task)}>delete</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ListScreen
