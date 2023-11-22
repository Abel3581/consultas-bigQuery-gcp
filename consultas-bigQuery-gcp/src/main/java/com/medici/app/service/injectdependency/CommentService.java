package com.medici.app.service.injectdependency;

import com.medici.app.dto.CommentRequest;
import com.medici.app.dto.CountyNatalityBaseResponse;

import java.util.List;

public interface CommentService {
    void createComment(Long id, CommentRequest request);


}
