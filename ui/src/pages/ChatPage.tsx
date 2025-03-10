// import React, { useState, useEffect, useRef } from "react";
// import {
//     Typography,
//     Box,
//     List,
//     ListItem,
//     ListItemAvatar,
//     ListItemText,
//     Avatar,
//     Button,
//     ToggleButton,
//     ToggleButtonGroup,
//     TextField,
// } from "@mui/material";
// import { Stomp } from "@stomp/stompjs";
// import { ChatControllerApi, ChatDto } from "../api";
// import Navbar from "../components/Navbar";
//
// const chatApi = new ChatControllerApi();
//
// const MessagePage: React.FC = () => {
//     const [chatType, setChatType] = useState<string>("selling");
//     const [users, setUsers] = useState<any[]>([]);
//     const [messages, setMessages] = useState<any[]>([]);
//     const [inputMessage, setInputMessage] = useState<string>("");
//     const [selectedUser, setSelectedUser] = useState<any | null>(null);
//     const socketClient = useRef<any>(null);
//
//     const loadUsers = async () => {
//         const response = await chatApi.getUsers({ userId: 1 });
//         setUsers(response);
//         if (response.length > 0) setSelectedUser(response[0]);
//     };
//
//     const loadChatHistory = async (userId: number) => {
//         const response = await chatApi.getChatHistory({ senderId: 1, receiverId: userId });
//         setMessages(response);
//     };
//
//     const onNewMessage = (msg: any) => {
//         const newMessage = JSON.parse(msg.body);
//         if (
//             (newMessage.senderId === 1 && newMessage.receiverId === selectedUser.id) ||
//             (newMessage.senderId === selectedUser.id && newMessage.receiverId === 1)
//         ) {
//             setMessages((prev) => [...prev, newMessage]);
//         }
//     };
//
//     useEffect(() => {
//         socketClient.current = Stomp.client("ws://localhost:8080/ws-chat");
//         socketClient.current.connect({}, () => {
//             socketClient.current.subscribe("/topic/messages", onNewMessage);
//         });
//
//         loadUsers();
//
//         return () => {
//             if (socketClient.current) socketClient.current.disconnect();
//         };
//     }, []);
//
//     useEffect(() => {
//         if (selectedUser) loadChatHistory(selectedUser.id);
//     }, [selectedUser]);
//
//     const sendMessage = async () => {
//         if (inputMessage.trim() === "" || !selectedUser) return;
//
//         const message: ChatDTO = {
//             senderId: 1,
//             receiverId: selectedUser.id,
//             content: inputMessage,
//             chatType: chatType.toUpperCase(),
//             timestamp: new Date().toISOString(),
//         };
//
//         await chatApi.sendMessage({ chatDTO: message });
//         setInputMessage("");
//     };
//
//     return (
//         <>
//             <Navbar />
//             <Box sx={{ display: "flex", flexDirection: "row", height: "100vh", padding: 2 }}>
//                 <Box sx={{ width: "30%", overflowY: "auto", padding: 2 }}>
//                     <ToggleButtonGroup
//                         value={chatType}
//                         exclusive
//                         onChange={(e, newType) => setChatType(newType || "selling")}
//                     >
//                         <ToggleButton value="selling">Selling</ToggleButton>
//                         <ToggleButton value="buying">Buying</ToggleButton>
//                     </ToggleButtonGroup>
//                     <List>
//                         {users.map((user) => (
//                             <ListItem
//                                 key={user.id}
//                                 onClick={() => setSelectedUser(user)}
//                                 sx={{
//                                     backgroundColor: user.id === selectedUser?.id ? "grey.300" : "transparent",
//                                     cursor: "pointer",
//                                 }}
//                             >
//                                 <ListItemAvatar>
//                                     <Avatar src={user.avatar} />
//                                 </ListItemAvatar>
//                                 <ListItemText
//                                     primary={user.name}
//                                     secondary={user.lastMessage}
//                                 />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Box>
//                 <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
//                     <Box sx={{ padding: 2 }}>
//                         <Typography variant="h6">{selectedUser?.name}</Typography>
//                     </Box>
//                     <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
//                         {messages.map((msg, index) => (
//                             <Box
//                                 key={index}
//                                 sx={{
//                                     alignSelf: msg.senderId === 1 ? "flex-end" : "flex-start",
//                                 }}
//                             >
//                                 <Typography>{msg.content}</Typography>
//                             </Box>
//                         ))}
//                     </Box>
//                     <Box sx={{ padding: 2, display: "flex" }}>
//                         <TextField
//                             fullWidth
//                             value={inputMessage}
//                             onChange={(e) => setInputMessage(e.target.value)}
//                             placeholder="Type a message..."
//                         />
//                         <Button onClick={sendMessage}>Send</Button>
//                     </Box>
//                 </Box>
//             </Box>
//         </>
//     );
// };
//
// export default MessagePage;