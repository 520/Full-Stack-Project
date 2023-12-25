import "./index.css";
import {useEffect, useState} from "react";
import {addMessage, listMessage} from "../../api/message";
import io from 'socket.io-client';
import {datetimeNormalization} from "../../utils/string";
import TimeUtils from "../../utils/TimeUtils";
import {getId, getRealName} from "../../utils/cookie";
export const ChatBox = ({apiJson, onSubmit}) => {

    const [display, setDisplay] = useState('none');
    const [content, setContent] = useState("");
    const [data, setData] = useState([{
        senderName: '',
        senderId: '',
        content: '',
        sendDate: ''
    }]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {

        loadData();
        const newSocket = io('http://localhost:8003');
        setSocket(newSocket);
        newSocket.on('message', (message) => {
            setData((prevMessages) => [...prevMessages, message]);
        });
        newSocket.on('connect', () => {
            console.log('Connected to server');
        });
        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        return () => {
            newSocket.disconnect();
        };
    }, []);



    const loadData = () => {
        listMessage().then(res => {
            if (res.code == 0) {
                setData(res.data);
            }
        });
    }

    const handleClick = () => {
        if (content == "") {return}
        const data = {
            senderId: getId(),
            senderName: getRealName(),
            sendDate: TimeUtils.getCurrentFormattedTime(),
            content
        }
        socket.emit('message', data);
        setContent('');
        addMessage(data).then(res => {
            console.log(res);
        });
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setContent(value);
    }

    const toggle = () => {
        if (display == 'none') {
            setDisplay('block');
        } else {
            setDisplay('none');
        }
    }

    return (
        <div className="chat-box">
            <div className="button-container">
                <button onClick={toggle} className="toggle-button">Chat box</button>
            </div>
        <div className="chat-box-container" style={{display:display}}>
            <div className="chat-messages" id="chatMessages">
                {data.map((item) =>
                    (
                        <>
                        <div className="message message-time">{datetimeNormalization(item.sendDate)}</div>
                        <div className={item.senderId==getId()?"message-right":"message-left"}>
                            {item.senderName}: {item.content}
                        </div>
                        </>
                    )
                )}
            </div>
            <div className="input-container">
                <input onChange={handleChange} value={content} type="text" className="message-input" placeholder="Type your message"/>
                    <button onClick={handleClick} className="send-button">Send</button>
            </div>
        </div>
            </div>
    )
}
