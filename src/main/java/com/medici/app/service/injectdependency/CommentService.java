package com.medici.app.service.injectdependency;

import com.medici.app.dto.CommentRequest;

public interface CommentService {
    void createComment(Long id, CommentRequest request);
}
