import React from 'react';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';


import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function App() {
    

    return (
        
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<Profile />} />
                    <Route path="/chat/:id" element={<Chat />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
    )
}



export default App;
