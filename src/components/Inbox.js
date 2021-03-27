import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.js';
import { checkAdminStatus, searchMessageDatabase, searchUserDatabase, sendMessageFromInbox, updateIsUnread } from '../firebase.js';
import Modal from "react-bootstrap/Modal";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Inbox() {

    const ADMIN_EMAIL = "graftontrainingsystems@gmail.com";
    const recipientRef = useRef();
    const textRef = useRef();
    const { currentUser, setCurrentUser } = useAuth();
    const [isUserAdmin, setIsUserAdmin] = useState(null);
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState('');
    const [messagesDisplayed, setMessagesDisplayed] = useState([]);
    const [usersFromDatabase, setUsersFromDatabase] = useState([]);
    const [recipient, setRecipient] = useState();
    const [isInboxOpen, setIsInboxOpen] = useState(false);
    const [recipientValue, setSearchValue] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isInboxEmpty, setIsInboxEmpty] = useState(false);

    useEffect(() => {

        const checkIsAdmin = async () => {
            if (isUserAdmin === null) {
                setLoading(true);
                const data = await checkAdminStatus(currentUser.email);
                setIsUserAdmin(data);
                setLoading(false);
                console.log(isUserAdmin);
            };
        };

        const fetchMessagesFromDatabase = async () => {
            if (isUserAdmin !== null && messages.length === 0 && !isInboxEmpty) {
                setLoading(true);
                const data = await searchMessageDatabase(currentUser.email);
                if (data.length === 0) {
                    setIsInboxEmpty(true);
                } else {
                    setMessages(data);
                }
                setLoading(false);
            };
        };

        checkIsAdmin();
        fetchMessagesFromDatabase();
    }, [currentUser.email, isUserAdmin, recipient, messages, isInboxOpen, isInboxEmpty, setIsInboxEmpty, messagesDisplayed]);

    const openInbox = () => {
        if (isInboxOpen) {
            setIsInboxOpen(false);
        } else {
            setIsInboxOpen(true);
        }
    };

    const openMessage = async (m) => {
        setLoading(true);
        await updateIsUnread(currentUser.email);

        setSelectedMessage(m);
        handleShowModal();

        setLoading(false);
    }

    const openNewMessage = async () => {
        setLoading(true);
        const m = { createdString: '', senderEmail: '', text: '' };
        setSelectedMessage(m);
        handleShowModal();

        setLoading(false);
    }

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    const sendMessage = () => {
        if (recipientRef.current.value.length > 0 && textRef.current.value.length > 0) {
            if (!isUserAdmin) {
                setRecipient(ADMIN_EMAIL);
            } else {
                setRecipient(recipientRef.current.value);
            };
            sendMessageFromInbox(currentUser.email, recipient, textRef.current.value);
        } else {
            setError('Please fill out all fields')
        }
    };

    const fetchMoreData = () => {
        if (messages.length >= 50) {
            this.setState({ hasMore: false });
            return;
        }

        setTimeout(() => {
            setMessages.concat(Array.from({ length: 20 }));
        }, 500);
    };

    return (
        <div>
            <Button onClick={openInbox}>Open Inbox</Button>

            {(isInboxOpen) ?
                <Button onClick={openNewMessage}>New Message</Button> : ""}
            {(isInboxOpen) && messages.length > 0 ?
                (loading) ? "... loading ..." :
                    <div id="message-table">
                        <InfiniteScroll
                            dataLength={messages.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {messages.map((m) =>
                                <div onClick={() => openMessage(m)} key={m.createdString}>
                                    {m.text} {m.createdString} {m.email}
                                </div>
                            )}
                        </InfiniteScroll>
                    </div>
                : ""}

            <Modal show={show} onHide={handleCloseModal}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMessage.createdString} {selectedMessage.senderEmail}</Modal.Title>
                </Modal.Header>
                {isUserAdmin === true ?
                    <Form inline>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" className="w-25" defaultValue={recipient}
                            ref={recipientRef} placeholder="Enter user's name or email" required />
                    </Form>
                    : ""}
                <Modal.Body> {selectedMessage.text}
                    <textarea ref={textRef} required> </textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={sendMessage} className="btn btn-primary">Send</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}