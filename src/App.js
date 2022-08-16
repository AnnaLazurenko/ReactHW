import React from 'react';
import {useEffect, useState, useRef} from "react";

import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

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


function App() {
    const [messageList, setMessageList] = useState([]);
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

    const drawer = (
        <Box>
          <List>
            {chatList.map((chat,id) => (
              <ListItem key={chat.id} disablePadding sx={{marginBottom: '36px', marginLeft: '8px'}}>
                  {chat.name}
              </ListItem>
            ))}
          </List>
        </Box>
      );

    useEffect(() => {
        setTimeout(()=> {
            botAnswer(messageList)
        }, 1500)
    }, [messageList]);

    function botAnswer() {
        const lastMessage = messageList[messageList.length - 1];
        
        if (lastMessage != null && lastMessage.author != 'Robotix') {
            let answers = [`Да что ты говоришь, ${lastMessage.author}!`, `Полностью согласен с ${lastMessage.author}.`, `${lastMessage.author}, расслабься, попей чаю`, `${lastMessage.author}! Такой прекрасный день, а ты за компом сидишь!`];
            setMessageList(prev => [...prev, {
                'id': getId(prev),
                'author': 'Robotix',
                'text': answers[(Math.round(Math.random() * (answers.length - 1)))],
            }])
        }
    }

    function getMessage(event) {
        event.preventDefault();
        let target = event.target;
        let author = target.author.value;
        let text = target.text.value;

        setMessageList(prev => [...prev, {
            'author': author.length ? author : 'Anonimus', 
            'text': text,
            'id': getId(prev)}]);

        console.log(`${messageList}`);
        target.author.value = '';
        target.text.value = '';
    }

    function getId(arr) {
        return arr.length ? arr[arr.length - 1].id + 1 : 0;
    }

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
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: `70%` }}>
                    <Box sx={{height: "calc(100vh - 250px)", paddingRight: "24px", overflow: 'scroll'}}>

                        {messageList.map(message =>
                            <Box sx={{marginTop: '36px', wordWrap: 'break-word'}} key={message.id}>
                                <p sx={{color: theme.palette.message.author}}>{message.author}:</p>
                                <p>{message.text}</p>
                            </Box>
                        )}

                    </Box>

                    <Box component="form" noValidate sx={{display: 'flex',
                        flexDirection: 'column',
                        height: '200px',
                        position: 'fixed',
                        bottom: '8px',
                        width: '70%'
                    }}
                     onSubmit={getMessage}>
                        
                        <TextField variant="outlined" multiline rows={3} required autoFocus helperText="Field can't be empty" id='text' name='text' placeholder='Write your message'/>

                        <Box sx={{margin: '24px 0', display: 'flex', justifyContent: 'space-between'}}>
                            <TextField variant="standard" type='text' id='author' name='author' placeholder='Nickname'/>
                            <Button sx={{backgroundColor:theme.palette.primary.main, color:theme.palette.secondary.main, width: '25%', '&:hover': {color: theme.palette.secondary.main}}} variant='contained' type='submit'>Send message</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}



export default App;
