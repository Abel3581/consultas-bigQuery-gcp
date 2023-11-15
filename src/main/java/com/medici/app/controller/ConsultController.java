package com.medici.app.controller;

import com.medici.app.dto.ConsultRequest;
import com.medici.app.dto.MessageResponse;
import com.medici.app.service.injectdependency.ConsultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/consults")
@RequiredArgsConstructor
public class ConsultController {

    private final ConsultService consultService;

    @PostMapping()
    public ResponseEntity<MessageResponse> saveConsults(@RequestBody ConsultRequest request){
        consultService.sabeConsults(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse());
    }
}
