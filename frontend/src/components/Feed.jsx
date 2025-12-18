import { useEffect, useState } from "react"
import { api } from "../api/api"
import MessageCard from "./MessageCard"
import { useMessageStore } from "../store/useMessageStore"

const Feed = ({ title = "Сообщения" }) => {
    const { messages, getMessages } = useMessageStore()
    const [timerId, setTimerId] = useState(undefined)

    useEffect(() => {
        getMessages()
        setTimerId(setInterval(() => {
            getMessages()
        }, 5000))

        return () => {clearInterval(timerId)}
    }, [])

    return (
        <>
            <div className="messages-section">
                <div className="container">
                    <h2 className="section-title">{title}</h2>
                    <div className="messages-grid">
                        {messages && messages.map((message, i) => (
                            <MessageCard key={i} {...message} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed