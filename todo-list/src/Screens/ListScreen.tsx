import React, { ChangeEvent, useState } from "react"

type Props = {}

type Task = {
  name: string
}

const ListScreen: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  const handleNewTaskChange = (e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)

  return (
    <div>
      <input value={newTask} onChange={handleNewTaskChange} />
    </div>
  )
}

export default ListScreen
