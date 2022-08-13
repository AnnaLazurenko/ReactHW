// import { getAllByTestId } from '@testing-library/dom';
import React from 'react';
import {useEffect, useState, useRef} from "react";

function App() {
    const [messageList, setMessageList] = useState([]);

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
        <main className='container'>
            <section className='messageList'>

                {messageList.map(message =>
                    <div className="messageList_item" key={message.id}>
                        <p className='messageList_item_author'>{message.author}:</p>
                        <p>{message.text}</p>
                    </div>
                )}

            </section>

            <form className='messageForm' onSubmit={getMessage}>
                
                <textarea required type='text' id='text' name='text' placeholder='Write your message'/>
                <div className="messageFrom_bottom">
                <input type='text' id='author' name='author' placeholder='Author'/>
                <button type='submit'>Send message</button>
                </div>
            </form>

        </main>
    )
}

export default App;
