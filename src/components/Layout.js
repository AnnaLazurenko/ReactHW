import React, { Component } from 'react';
import {useEffect, useState, useRef} from "react";

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import CustomLink from './CustomLink';
import { Outlet } from "react-router-dom";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const theme = createTheme({
    palette: {
        primary: {
            main: "#03fcec",
        },
        secondary: {
            main: "#324e85",
        },
        message: {
            author: "#8a2be2",
        },
    },
});

const Layout = () => {
    const [chatList, setChatList] = useState([
        {
            name: 'Машенька',
            id: 123
        },
        {
            name: 'Серафима Андреевна',
            id: 1234
        },
        {
            name: 'Ремонт Телефонов',
            id: 1235423
        },
        {
            name: 'Ноготочки',
            id: 1234325
        }
    ]);

    function deleteChat(id) {
        setChatList(prev => prev.filter((el) => (
            el.id != id
        )))
    }

    function addChat() {
        let name = prompt("Введите имя нового собеседника:");
        let id = new Date().getTime();

        setChatList(prev => [...prev, {
            'name': name, 
            'id': id}])
    }



    const drawer = (
        <Box>
            <Toolbar sx={{backgroundColor: theme.palette.primary.main}}>
                <Typography variant="h6" noWrap component="div">
                    <NavLink to='/' sx={{textDecoration: 'none'}}>My Profile</NavLink>
                </Typography>
            </Toolbar>
        <Divider />
          <List>
            {chatList.map((chat,id) => (
              <ListItem key={chat.id} disablePadding sx={{margin: '36px 8px', display: 'flex', justifyContent: 'space-between'}}>
                  <CustomLink to={'/chat/'+chat.id}>{chat.name}</CustomLink>
                  <Button onClick={() => {deleteChat(chat.id)}}>X</Button>
              </ListItem>
            ))}
          </List>
          <Button variant='contained' onClick={() => {addChat()}}>Add Chat</Button>
        </Box>
      );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex'}}>

                <Drawer sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}         
                    variant="permanent"
                    anchor="left">
                    {drawer}
                </Drawer>
                <main>
                    <Outlet  context={[chatList, setChatList]}/>
                </main>
            </Box>
        </ThemeProvider>
    )
}

export default Layout;