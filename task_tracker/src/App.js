import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([])

  useEffect( () => {
    const getTask = async () =>{
        const taskFromServer = await fetchTask()
        setTask(taskFromServer)
    }
    getTask()
  }, [])

  //Fetch task
  const fetchTask = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
   //Fetch tasks
   const fetchTasks = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }


  //Submit Task 
  const addTask = async (task)=> {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    
    const data = await res.json()

    setTask([...tasks, data])
    //const id = Math.floor(Math.random() * 10000) + 1
      //const newTask = { id, ...task }
      //([...tasks, newTask])

  }
  //Delete Task
  const deleteTask = async (id)=> {
    await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
    })

    setTask(tasks.filter((task) => task.id!==id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => { 
      const taskToToggle = await fetchTasks(id)
      const updtask = {...taskToToggle, reminder: !taskToToggle.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updtask)
      })

      const data = await res.json()

      setTask(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }
  return (
    <Router>
    <div className="container">
      <Header onAdd = {() => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
      
      <Route path="/" exact render = {(props) => (
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle={toggleReminder} /> : <p style={{color: 'white'}}>No recent task!</p>}
        </>
       )} /> 
      <Route path='/about' component = {About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
