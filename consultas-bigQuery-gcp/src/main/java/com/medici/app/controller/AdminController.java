package com.medici.app.controller;

import com.medici.app.dto.AdminRequest;
import com.medici.app.dto.MessageResponse;
import com.medici.app.exception.AppResetException;
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
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(HttpStatus.OK, "Ingresando a la app"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas"));
        }
    }

    @DeleteMapping
    public ResponseEntity<MessageResponse> appReset(){
        try {
            adminService.appRest();

            // Si el reset se realiza correctamente, puedes devolver una respuesta exitosa
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(HttpStatus.OK, "Reset exitoso"));
        } catch (AppResetException e) {
            // Captura la excepción personalizada
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
        } catch (Exception e) {
            // Captura cualquier otra excepción no esperada
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Error al resetear la aplicación"));
        }
    }

}
