import './App.css';
import DarkMode from './components/DarkMode';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <>
      <DarkMode />
      <div className='all'>
        <ToDoList />
      </div>
    </>
  );
}

export default App;
