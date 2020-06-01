import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {

  const URL = '/todos';

  let [todoData,setTodoData] = useState([]);

  /* Fetch Data From the Node Server */
  const fetchData=()=>{
    todoData = [];
    axios.get(URL)
    .then(res=>{ 
      todoData.push(...res.data);
      setTodoData([...todoData]);
    })
  }

  /* Add Data to the server */
  const addData = e =>{
    e.preventDefault();
    const newTodo = {
      todo: e.target.todoName.value
    };
    axios.post(URL,newTodo)
    .then(res=>{
      alert(res.data);
      fetchData();
    })
    e.target.todoName.value="";
  }

  /* Delete Data from the server */
  const deleteData = (index) => {
    axios.delete(URL+`/${index}`)
    .then(res=>{
      alert(res.data);
      fetchData();
    });
  }

  /* Update Data to the server */
  const updateData = e => {
      e.preventDefault();
      const index = e.target.updateIndex.value;
      const value = e.target.updateTodo.value;
      axios.put(URL+`/${index}`,{modifiedTodo:value})
      .then(res=>{
        alert(res.data);
        fetchData();
      });
      e.target.updateTodo.value = "";
  }

  /* Load Data when the application runs for the first time */
  useEffect(()=>{
    fetchData();
  },[]);

  /* Detect Change whenever there is a change in the todoData */
  useEffect(()=>{},[todoData])

  return (
    <div className="container">
      <p className="h2 text-center">Todos</p>
      <div className="row justify-content-center mt-4">
        <p className="h3 justify-content-center">Add Todo Data</p>
      </div>
      <form className="form-group border p-4" onSubmit={addData}>
        <div className="row p-2">
          <div className="col">Todo</div>
          <div className="col"><input className="form-control" type="text" name="todoName"/></div>
        </div>
        <div className="row pt-2 justify-content-center">
          <button className="btn btn-primary">Add Todo</button>
        </div>
      </form>
      <ul className="list-group">
      {
          todoData.map((val,index)=>(
            <li className="list-group-item justify-content-between" key={index}>
              <div className="card">
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div>{val}</div>
                      </div>
                      <div className="col">
                        <button className="btn btn-danger" onClick={()=>deleteData(index)}>Delete</button>
                      </div>
                      <div className="col">
                        <form onSubmit={updateData}>
                          <input type="text" className="form-control" name="updateTodo" placeholder="Todo Update"/>
                          <input type="hidden" name="updateIndex" value={index}/>
                          <button className="btn btn-warning m-2">Update</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
