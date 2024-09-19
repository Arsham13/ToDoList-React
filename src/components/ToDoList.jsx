import React, { useRef, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

function ToDoList() {
  const [progress, setProgress] = useState(0);

  const addInputRef = useRef(null);
  const [toDoList, setToDoList] = useState([]);
  const [filterMode, setFilterMode] = useState('all');


  const handleModes = (mode) => {
    setFilterMode(mode);
  };

  const handleDelete = (index) => {
    const updatedToDoList = toDoList.filter((item, i) => i !== index);
    setToDoList(updatedToDoList);
  };

  const handleAdd = (value) => {
    setProgress(progress + 100);

    value = value.trim(value)
    if(value !== ''){
      setToDoList((prevItems) => [
        ...prevItems,
        {
          id: prevItems.length > 0 ? prevItems[prevItems.length - 1].id + 1 : 1, // تعیین ID به صورت خودکار
          title: value,
          done: false,
        },
      ]);
      addInputRef.current.value = '';
    } else{
      return;
    }

  };

  const handleDone = (index) => {
    const updatedToDoList = toDoList.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setToDoList(updatedToDoList);
  };

  const filteredToDoList = toDoList.filter((item) => {
    if (filterMode === 'all') return true;
    if (filterMode === 'done') return item.done;
    if (filterMode === 'notDone') return !item.done;
    return true;
  });

  return (
    <>
      <div>
        <LoadingBar
          color='#ff8324'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          waitingTime={900}
          transitionTime={200}
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd(addInputRef.current.value);
        }}
      >
        <input type="text" ref={addInputRef} />
        <button type="submit">Add</button>
      </form>
      {filteredToDoList.length !== 0 ? (
        filteredToDoList.map((content, index) => (
          <div key={content.id} className="container">
            <div className='todo-item'>
              <input
                className='checkBox'
                type="checkbox"
                checked={content.done}
                onChange={() => handleDone(
                  toDoList.findIndex((item) => item.id === content.id)
                )}
              />
              <p className="todo">{content.title}</p>
            </div>

            <button className='delete' onClick={() => handleDelete(
              toDoList.findIndex((item) => item.id === content.id)
            )} type="button">×</button>
          </div>
        ))
      ) : (
        <p id="notToDo">There is no task.</p>
      )}
      <div>
        <div className="modes">
        <p className={`mode ${filterMode === 'all' ? 'active' : ''}`} onClick={() => handleModes('all')}>All</p>
          <p>|</p>
          <p className={`mode ${filterMode === 'done' ? 'active' : ''}`} onClick={() => handleModes('done')}>Done</p>
          <p>|</p>
          <p className={`mode ${filterMode === 'notDone' ? 'active' : ''}`} onClick={() => handleModes('notDone')}>Not Done</p>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
