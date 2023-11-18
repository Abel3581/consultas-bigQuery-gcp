package com.medici.app.service;

import com.medici.app.dto.CommentRequest;
import com.medici.app.entity.CommentQuery;
import com.medici.app.entity.CountyNatalityBase;
import com.medici.app.mapper.CommentMapper;
import com.medici.app.repository.CommentRepository;
import com.medici.app.service.injectdependency.CommentService;
import com.medici.app.service.injectdependency.ConsultService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final ConsultService consultService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;

    @Override
    public void createComment(Long idConsult, CommentRequest request) {
        CountyNatalityBase countyNatalityBase = consultService.findById(idConsult);
        CommentQuery commentQuery = commentMapper.mapToCommentRequest(request);
        List<CommentQuery> commentQueryList = countyNatalityBase.getCommentQueries();
        commentQueryList.add(commentQuery);
        countyNatalityBase.setCommentQueries(commentQueryList);
        commentQuery.setCountyNatalityBase(countyNatalityBase);
        consultService.saveComment(countyNatalityBase);
        commentRepository.save(commentQuery);
    }
}
