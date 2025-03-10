/*
package com.sashojoto.harvesthub.chat;
import com.sashojoto.harvesthub.common.ChatType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import com.sashojoto.harvesthub.user.User;
import com.sashojoto.harvesthub.chat.Message;

@Service
public class ChatService {

    @Autowired
    private MessageRepository messageRepository;

    @Transactional
    public Message saveMessage(Long senderId, Long receiverId, String content, ChatType chatType) {
        User sender = userRepository.findById(senderId).orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId).orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = new Message(sender, receiver, content, chatType, LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<Message> getMessageHistory(Long senderId, Long receiverId) {
        return messageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
    }
}*/
