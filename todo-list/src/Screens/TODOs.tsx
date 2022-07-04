import { Button, ListItem, ListItemText } from "@mui/material"
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"

import React from "react"
import { Task } from "./ListScreen"

type TODOs = {
  task: Task
  remove: (e: Task) => void
}

export const TODO: React.FC<TODOs> = ({ task, remove }) => {
  return (
    <ListItem key={task.id}>
      <ListItemText>{task.name}</ListItemText> <ListItemText>{task.date}</ListItemText>
      <Button
        onClick={() => remove(task)}
        variant="outlined"
        color="error"
        endIcon={<DeleteTwoToneIcon />}>
        delete
      </Button>
    </ListItem>
  )
}
