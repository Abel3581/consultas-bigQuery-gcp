package com.medici.app.controller;


import com.medici.app.dto.ConsultRequest;
import com.medici.app.dto.CountyNatalityBaseResponse;
import com.medici.app.dto.MessageResponse;
import com.medici.app.dto.SavedQueriesResponse;
import com.medici.app.service.injectdependency.ConsultService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/all")
    public ResponseEntity<List<SavedQueriesResponse>> getAllConsults(){
        List<SavedQueriesResponse> response = consultService.getAllConsults();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<CountyNatalityBaseResponse>> getByIdConsultTable(@PathVariable Long id){
        List<CountyNatalityBaseResponse> responses = consultService.getByIdConsultTable(id);
        return ResponseEntity.status(HttpStatus.OK).body(responses);

    }




}
