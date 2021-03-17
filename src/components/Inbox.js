import React, { useRef, useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.js';
import { checkAdminStatus, searchMessageDatabase, sendMessageFromInbox, updateIsUnread } from '../firebase.js';

export default function Inbox() {

    const ADMIN_EMAIL = "ben@ben.com";
    const { currentUser, setCurrentUser } = useAuth();
    const [isUserAdmin, setIsUserAdmin] = useState();
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState('');
    const [messagesDisplayed, setMessagesDisplayed] = useState([]);
    const [recipient, setRecipient] = useState();
    const [isInboxOpen, setIsInboxOpen] = useState(false);
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {

        const checkIsAdmin = async () => {
            setLoading(true);
            setIsUserAdmin(true);
            setLoading(false);
        };

        const fetchMessagesFromDatabase = async () => {
            if (messages.length === 0) {
                setLoading(true);
                // await setMessages(searchMessageDatabase(currentUser.email));
                const data = await searchMessageDatabase(currentUser.email);
                setMessages(data);
                console.log(messages)
            };
        };

        checkIsAdmin();
        fetchMessagesFromDatabase();
    }, [currentUser.email, recipient, messages, isInboxOpen, messagesDisplayed]);

    const openInbox = async () => {
        await setIsInboxOpen(true);
    };

    const openMessage = async (m) => {
        await updateIsUnread(currentUser.email);
        // render textarea
        // get message
        if (isUserAdmin) {
            setRecipient(ADMIN_EMAIL);
        } else {
            setRecipient("not admin")
        };

        setSelectedMessage(m);
        handleShowModal();

        setLoading(false);
    }

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    const sendMessage = () => {
        sendMessageFromInbox(currentUser.email, recipient, value);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <Button onClick={openInbox}>Open Inbox</Button>

            <div id="message-table">
                {(isInboxOpen) ?
                    (loading) ? "... loading ..." :
                        messages.length > 0 ?
                            messages.map((m) =>
                                <div onClick={() => openMessage(m)} key={m.createdString}>
                                    {m.text} {m.createdString} {m.email}
                                </div>
                            )
                            : "Cannot find messages." : null}
            </div>

            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMessage.createdString} {selectedMessage.senderEmail}</Modal.Title>
                </Modal.Header>
                <Modal.Body> {selectedMessage.text}
                    <textarea> Response here </textarea>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={sendMessage} className="btn btn-primary">Send</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

// set recipient
// infinite scroll