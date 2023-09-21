import React, { useEffect, useState } from "react";
import "./style.css";



const getLocalData = () => {
  const lists = localStorage.getItem("todolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};



const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const[isEditItem,setIsEditItem]=useState("");
  const[toggleButton,setToggleButton]=useState(false);
  // adding local storage

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items]);


  // Adding items 

  const addItem = () => {
    if (!inputdata) {
      alert("please fill data");
    }
    else if(inputdata && toggleButton){
        setItems(
          items.map((currElem)=>{
            if(currElem.id===isEditItem){
              return{...currElem,name:inputdata};
            }
            return currElem;
          })
        )
        setInputData([])
        setIsEditItem(null);
        setToggleButton(false)
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
// edit the items

const editItem=(index)=>{
        const item_todo_edited = items.find((currElem)=>{
          return currElem.id ==index;
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index);
        setToggleButton(true)
}

  // delete item section
  const deleteItem = (index) => {
    const updatedItens = items.filter((currElem) => {
      return currElem.id != index;
    });
    setItems(updatedItens);
    //  const
  };



  // remove all elements
  const removeAll = () => {
    setItems([]);
  };
  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src="./todologo.png" alt="no image found"></img>
          <figcaption>Add Your List Here</figcaption>
        </figure>

        <div className="addItems">
          <input
            type="text"
            placeholder="👉 Add Items"
            className="form-control"
            value={inputdata}
            onChange={(event) => setInputData(event.target.value)}
          ></input>
          {toggleButton ? (
            <i className="far fa-edit add-btn"  aria-hidden="true" onClick={addItem}></i>
          ):
          (<i className="fa fa-plus add-btn" aria-hidden="true" onClick={addItem}></i>)
          } 
         
        </div>
        <div className="showItems">
          {items.map((currElem) => {
            return (
              <div className="eachItem" key={currElem.id}>
                <h3>{currElem.name}</h3>
                <div className="todo-btn">
                  <i class="far fa-edit add-btn" onClick={()=>editItem(currElem.id)}> </i>
                  {/* <i class="fa fa-minus" aria-hidden="true"></i> */}
                  {/* <i class="fa fa-trash" aria-hidden="true"></i> */}
                  <i
                    class="fa fa-ban"
                    aria-hidden="true"
                    onClick={() => deleteItem(currElem.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="showItems">
          <button className="btn effect04" onClick={removeAll}>
            Remove all
          </button>
        </div>
      </div>
    </div>
  );
};


export default Todo;
