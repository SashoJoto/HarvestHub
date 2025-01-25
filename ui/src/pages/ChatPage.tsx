import React, { useState } from "react";
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    TextField,
} from "@mui/material";
import Navbar from "../components/Navbar";

const MessagePage: React.FC = () => {
    // State to toggle between Selling and Buying
    const [chatType, setChatType] = useState<string>("selling");

    // Mock user data for the chat list
    const users = [
        { id: 1, name: "John Doe", lastMessage: "Hey, is this still available?", avatar: "https://via.placeholder.com/50" },
        { id: 2, name: "Alex Smith", lastMessage: "Can we negotiate the price?", avatar: "https://via.placeholder.com/50" },
        { id: 3, name: "Sarah Connor", lastMessage: "I'll pick it up tomorrow.", avatar: "https://via.placeholder.com/50" },
    ];

    // Mock chat messages
    const messages = [
        { id: 1, sender: "John", text: "Hey, is this still available?", time: "10:45 AM" },
        { id: 2, sender: "You", text: "Yes, it's available!", time: "10:47 AM" },
        { id: 3, sender: "John", text: "Thanks, I’ll get it tomorrow.", time: "10:48 AM" },
    ];

    // State to track the currently selected user
    const [selectedUser, setSelectedUser] = useState(users[0]); // Default to the first user

    // Handle user selection from the users' list
    const handleUserSelect = (user: typeof users[0]) => {
        setSelectedUser(user);
    };

    const handleChatTypeChange = (event: React.MouseEvent<HTMLElement>, newChatType: string | null) => {
        if (newChatType) {
            setChatType(newChatType);
        }
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Main Container */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 64px)", // Full height minus navbar
                    padding: { xs: 0, sm: 2 },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        flex: 1,
                        maxWidth: { sm: "100%", md: "90%", lg: "75%" },
                        height: { xs: "100%", md: "90%" },
                        overflow: "hidden",
                        backgroundColor: "rgb(50,66,60)", // Adjusted background color with global theme palette
                        borderRadius: "16px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    {/* Users List Section */}
                    <Box
                        sx={{
                            width: { xs: "100%", sm: "30%" },
                            overflowY: "auto",
                            padding: 2,
                        }}
                    >
                        {/* Chat Type Toggle */}
                        <ToggleButtonGroup
                            value={chatType}
                            exclusive
                            onChange={handleChatTypeChange}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: 2,
                            }}
                        >
                            <ToggleButton
                                value="selling"
                                sx={{
                                    textTransform: "capitalize",
                                    flex: 1,
                                    fontWeight: 600,
                                    padding: "8px 16px",
                                }}
                            >
                                Selling
                            </ToggleButton>
                            <ToggleButton
                                value="buying"
                                sx={{
                                    textTransform: "capitalize",
                                    flex: 1,
                                    fontWeight: 600,
                                    padding: "8px 16px",
                                }}
                            >
                                Buying
                            </ToggleButton>
                        </ToggleButtonGroup>

                        {/* Users List */}
                        <List>
                            {users.map((user) => (
                                <ListItem
                                    key={user.id}
                                    sx={{
                                        padding: 1.5,
                                        borderRadius: 2,
                                        marginBottom: 1,
                                        transition: "all 0.3s",
                                        ":hover": {
                                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                                            cursor: "pointer",
                                        },
                                        backgroundColor: user.id === selectedUser.id ? "rgba(0, 0, 0, 0.1)" : "inherit",
                                    }}
                                    onClick={() => handleUserSelect(user)}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={user.avatar} alt={user.name} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                {user.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {user.lastMessage}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* Chat Box Section */}
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            backgroundColor: "rgb(34,47,50)",
                            color: "white",
                            borderRadius: "8px", // Overall chat section styling
                        }}
                    >
                        {/* Chat Header */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                padding: "10px 20px",
                                backgroundColor: "rgb(48,58,60)", // Slightly darker for header
                                borderTopLeftRadius: "8px",
                                borderTopRightRadius: "8px",
                            }}
                        >
                            <Avatar src={selectedUser.avatar} alt={selectedUser.name} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {selectedUser.name}
                            </Typography>
                        </Box>

                        {/* Chat Messages */}
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                padding: 2,
                                backgroundColor: "rgb(39,50,54)",
                            }}
                        >
                            {messages.map((message) => (
                                <Box
                                    key={message.id}
                                    sx={{
                                        alignSelf: message.sender === "You" ? "flex-end" : "flex-start",
                                        backgroundColor:
                                            message.sender === "You" ? "rgb(59,167,73)" : "rgb(48,58,60)",
                                        color: "white",
                                        padding: "10px 15px",
                                        borderRadius: "16px",
                                        maxWidth: "70%",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "14px", fontWeight: 500, marginBottom: 1 }}>
                                        {message.sender}
                                    </Typography>
                                    <Typography sx={{ fontSize: "16px" }}>{message.text}</Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "12px",
                                            textAlign: "right",
                                            marginTop: 1,
                                            opacity: 0.7,
                                        }}
                                    >
                                        {message.time}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Chat Input */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                padding: "10px",
                                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <TextField
                                fullWidth
                                placeholder="Type a message..."
                                variant="outlined"
                                sx={{
                                    input: {
                                        color: "white",
                                        backgroundColor: "rgb(48,58,60)",
                                        borderRadius: "8px",
                                        padding: "10px",
                                    },
                                }}
                            />
                            <Button variant="contained" color="primary">
                                Send
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default MessagePage;