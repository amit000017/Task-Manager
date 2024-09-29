import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from "./components/Navbar"
import { MdEditSquare } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {
  
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(()=>{
    let todostring=localStorage.getItem("todos")
    if(todostring){
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
  },[])




  const savetols=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
    }

  const handleadd=()=>{
       settodos([...todos,{id:uuidv4(),todo,iscompleted:false}])
       settodo("")
       console.log(todos)
       savetols()
  }
  const handleedit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
      
    });
    
    settodos(newTodos)
    savetols();

  }
  const handledelete=(id)=>{
    
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    
    settodos(newTodos)
    savetols();

  }

  const handlechange= (e) => {
    settodo(e.target.value)
  }

  const [showfinished,setshowfinished]=useState(true)



  const togglefinished= (e)=>{
    setshowfinished(!showfinished)

  }

  const handlecheckbox= (e) =>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })

    let newTodos=[...todos];
    newTodos[index].iscompleted=!newTodos[index].iscompleted;
    settodos(newTodos)
    savetols();

  }

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto  my-5 p-5 rounded-xl bg-violet-200 min-h-[80vh] md:w-1/2 ">
        <div className="addtodo m-5 ">
          <h2 className='text-lg font-bold'>Add To-Do</h2>
          <input onChange={handlechange} value={todo} type="text" className='w-10/12 rounded-lg p-3 my-4 ' style={{ maxWidth: '100%', wordBreak: 'break-word' }} />
          <button onClick={handleadd} disabled={todo.length<3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md text-white mx-6'>Add</button>
        </div>
        <input className="text-lg font-bold " onChange={togglefinished} type="checkbox" checked={showfinished}/> Finished Tasks
        <h2 className="text-lg font-bold my-5">Your To-Do's</h2>
        <div className="todos">

          {todos.length===0 && <div className='empty m-5 font-bold text-lg'>No To-Do's to display</div>}
          {todos.map(item=>{
        return(showfinished || !item.iscompleted) &&
         <div  key={item.id} className="todo flex md:w-full justify-between my-4">
          <div className='flex gap-5 my-3 text-lg font-bold w-full'>
          <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted}/>
    <div className={item.iscompleted ? "line-through" : ""} style={{ wordBreak: 'break-word', width: '90%' }}>{item.todo}</div>
  </div>
          <div className="buttons flex h-full">
          <button onClick={(e)=>handleedit(e,item.id)} className="bg-violet-800 hover:bg-violet-950 p-3 px-4 text-sm font-bold rounded-md text-white">
          <MdEditSquare />
              </button>
              <button onClick={()=>handledelete(item.id)} className="bg-red-600 hover:bg-red-700 p-3 px-4 text-sm font-bold rounded-md text-white ml-2">
              <RiDeleteBin6Line /></button>
              
          </div>
        </div>
})}
        </div>
       
      </div>
    </>
  )
}

export default App
