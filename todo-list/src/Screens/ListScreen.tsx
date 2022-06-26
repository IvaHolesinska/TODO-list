import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"

import { nanoid } from "nanoid"

/** material UI library */
import { Box, Button, Fab, List, ListItem, ListItemText, TextField } from "@mui/material"
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import AddIcon from "@mui/icons-material/Add"

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

  /** date and time of creating task */
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
        disabled={!newTask || sameValue === true}
        type="submit"
        color="success"
        aria-label="add"
        sx={{ marginTop: 1, marginLeft: 2 }}>
        <AddIcon />
      </Fab>

      {/** list of tasks */}
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText>{task.name}</ListItemText> <ListItemText>{task.date}</ListItemText>
            <Button
              onClick={() => handleDelete(task)}
              variant="outlined"
              color="error"
              endIcon={<DeleteTwoToneIcon />}>
              delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ListScreen
