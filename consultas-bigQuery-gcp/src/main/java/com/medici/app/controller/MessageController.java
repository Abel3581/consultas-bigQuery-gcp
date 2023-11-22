package com.medici.app.controller;


import com.medici.app.dto.CommentRequest;
import com.medici.app.dto.CountyNatalityBaseRequest;
import com.medici.app.dto.CountyNatalityBaseResponse;
import com.medici.app.dto.MessageResponse;
import com.medici.app.service.injectdependency.CommentService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MessageController {

    private final CommentService commentService;

    @PostMapping("/{id}")
    public ResponseEntity<MessageResponse> createComment(@PathVariable Long id, @RequestBody CommentRequest request){
        commentService.createComment(id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse(HttpStatus.CREATED,"Comentario creado"));
    }


}
