package com.medici.app.controller;

import com.medici.app.dto.AdminRequest;
import com.medici.app.dto.MessageResponse;
import com.medici.app.service.injectdependency.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    @PostMapping
    public ResponseEntity<MessageResponse> loginAdmin(@RequestBody AdminRequest request) {
        String username = request.getUserAdmin();

        if (adminService.adminExistsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(HttpStatus.OK, "Logueo exitoso"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas"));
        }
    }

}
