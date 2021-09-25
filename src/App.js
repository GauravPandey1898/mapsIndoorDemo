import logo from './logo.svg';
import {useState} from 'react';
import Animation from "./animation/animate";
import Maps from "./maps/maps";
import './App.css';

function App() {
  let [value, setValue] = useState(true)
  return (
    <div className="App">
      <Maps />
      {/* <Animation show={value}>
        <div className="hello" onClick={()=>setValue(!value)}>
          Hello my name is gigi
        </div>
      </Animation> */}
    </div>
  );
}

export default App;
