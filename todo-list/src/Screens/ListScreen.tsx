import React, { ChangeEvent, KeyboardEvent, useState } from "react"

type Props = {}

type Task = {
  name: string
}

const ListScreen: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  const handleNewTaskChange = (e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setTasks((tasks) => [...tasks, { name: newTask }])
  }

  return (
    <div>
      <input value={newTask} onChange={handleNewTaskChange} onKeyPress={handleNewTaskKeyPress} />
    </div>
  )
}

export default ListScreen
