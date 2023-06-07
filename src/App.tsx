import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TestMachine from "./model/machines/test";
import { useMachine } from '@xstate/react'
import { interpret } from 'xstate';

function App() {
  const [current, send] = useMachine(TestMachine);
  useEffect(()=>{
    send('LOAD', { page: current.context.page, searchValue: current.context.searchValue })
  }, [send])
  
  return ( 
    <div className="App"> 
     {JSON.stringify(current.context.list)}
    </div> 
  ); 
}

export default App;
