import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { nanoid } from "nanoid"

type Props = {}

type Task = {
  id: string
  name: string
}

const ListScreen: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  const handleNewTaskChange = (e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTask !== "") {
      setTasks((tasks) => [...tasks, { id: nanoid(), name: newTask }])
      setNewTask("")
    }
  }

  return (
    <div>
      <input value={newTask} onChange={handleNewTaskChange} onKeyPress={handleNewTaskKeyPress} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ListScreen
