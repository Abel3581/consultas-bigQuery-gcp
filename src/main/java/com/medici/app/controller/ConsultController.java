package com.medici.app.controller;


import com.medici.app.dto.ConsultRequest;
import com.medici.app.dto.MessageResponse;
import com.medici.app.service.injectdependency.ConsultService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/consults")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ConsultController {

    private final ConsultService consultService;

    @PostMapping("/create")
    public ResponseEntity<MessageResponse> save(@RequestBody ConsultRequest request){
        consultService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse(HttpStatus.CREATED,"Consulta Guardada"));
    }


}
