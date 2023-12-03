package com.medici.app.mapper;

import com.medici.app.dto.CommentRequest;
import com.medici.app.entity.CommentQuery;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class CommentMapper {
    public CommentQuery mapToCommentRequest(CommentRequest request) {
        return CommentQuery.builder()
                .comment(request.getComment())
                .nameUser(request.getNameUser())
                .creationDate(LocalDateTime.now())
                .build();
    }
}
