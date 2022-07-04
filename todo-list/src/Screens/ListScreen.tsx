import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"

import { nanoid } from "nanoid"

/** material UI library */
import { Box, Fab, List, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { TODO } from "./TODOs"

type Props = {}

export type Task = {
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

  /** date and time of creating task */
  useEffect(() => {
    const today = new Date()
    const date = today.getDate() + ". " + (today.getMonth() + 1) + ". " + today.getFullYear()
    const time = today.getHours() + ":" + String(today.getMinutes()).padStart(2, "0")
    const dateTimeFormat = date + " " + time
    setDayTime(dateTimeFormat)
  }, [newTask])

  /** add new tasks */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isDisabled() === false) {
      setTasks((tasks) => [...tasks, { id: nanoid(), name: newTask, date: dayTime }])
      setNewTask("")
    }
  }

  /** delete tasks */
  const handleDelete = (handleTask: Task) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== handleTask.id))
  }

  /** check if the value of the input is already on the to-do lists */
  const isDisabled = () => {
    const sameValue = tasks.some((task) => task.name === newTask)
    if (sameValue === true || !newTask) {
      return true
    }
    return false
  }

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: 752, margin: "auto", marginTop: 5 }}
      component="form"
      onSubmit={handleSubmit}>
      <TextField
        id="standard-basic"
        label="Add your task"
        variant="standard"
        color="success"
        value={newTask}
        onChange={handleNewTaskValue}
      />
      <Fab
        size="small"
        disabled={isDisabled()}
        type="submit"
        color="success"
        aria-label="add"
        sx={{ marginTop: 1, marginLeft: 2 }}>
        <AddIcon />
      </Fab>

      {/** list of tasks */}
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {tasks.map((task) => (
          <TODO task={task} remove={(task) => handleDelete(task)} />
        ))}
      </List>
    </Box>
  )
}

export default ListScreen
