/*
package com.sashojoto.harvesthub.chat;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(@RequestParam Long userId) {
        List<User> users = chatService.getUsersForChat(userId);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Chat>> getChatHistory(
            @RequestParam Long senderId,
            @RequestParam Long receiverId
    ) {
        List<Chat> chatHistory = chatService.getChatHistory(senderId, receiverId);
        return ResponseEntity.ok(chatHistory);
    }

    @PostMapping
    public ResponseEntity<Chat> sendMessage(@RequestBody ChatDTO chatDTO) {
        Chat sentMessage = chatService.saveMessage(chatDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(sentMessage);
    }
}
*/
