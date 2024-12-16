import { BrowserRouter } from "react-router-dom"
import "./App.css"
import { Router } from "./Router"


export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}