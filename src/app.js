import React from 'react';
import {BrowserRouter as Router,Route}from 'react-router-dom'
import Join from './component/Join/join';
import Chat from './component/Chat/chat';

const app =(props)=>{
    return (
        <Router>
            <Route path="/" exact component={Join}/>
            <Route path="/chat" component={Chat}/>
        </Router>
    )
}

export default app;