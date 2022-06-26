import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListScreen from "./Screens/ListScreen"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
