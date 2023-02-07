import React from 'react';
import {treeExample} from "./data";
import TreeView from "./components/TreeView";
import './App.css';

function App() {
  return (
    <div className="App">
     <TreeView tree={treeExample}/>
    </div>
  );
}
export default App;

