package com.aslibrary.asproject.controller;

import com.aslibrary.asproject.dto.CustomerDTO;
import com.aslibrary.asproject.entities.Customer;
import com.aslibrary.asproject.services.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CreateCustomer {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/create")
    public ResponseEntity<String> createCustomer(@RequestBody @Valid CustomerDTO customerDTO) {
        try {
            Customer createdCustomer = customerService.createCustomer(customerDTO);
            return ResponseEntity.ok("Usuario registrado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el usuario: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody CustomerDTO customerDTO) {
        try {
            Customer customer = customerService.validateCustomer(customerDTO.getEmail(), customerDTO.getPassword());
            if (customer != null) {
                CustomerDTO responseDTO = new CustomerDTO(
                        customer.getId(),
                        customer.getName(),
                        customer.getAge(),
                        customer.getIdCity(),
                        customer.getIdCountry(),
                        customer.getIdGender(),
                        customer.getIdOccupation(),
                        customer.getIdMemberCard() != null ? customer.getIdMemberCard().getId() : null,
                        customer.getEmail(),
                        customer.getBirthdate(),
                        customer.getPassword()
                );
                responseDTO.setId(customer.getId());
                responseDTO.setEmail(customer.getEmail());
                responseDTO.setName(customer.getName());
                return ResponseEntity.ok(responseDTO);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor: " + e.getMessage());
        }
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody CustomerDTO customerDTO) {
        try {
            Customer customer = customerService.validateCustomer(customerDTO.getEmail(), customerDTO.getPassword());
            CustomerDTO responseDTO = new CustomerDTO(
                    customer.getId(),
                    customer.getName(),
                    customer.getAge(),
                    customer.getIdCity(),
                    customer.getIdCountry(),
                    customer.getIdGender(),
                    customer.getIdOccupation(),
                    customer.getIdMemberCard() != null ? customer.getIdMemberCard().getId() : null,
                    customer.getEmail(),
                    customer.getBirthdate(),
                    customer.getPassword()
            );
            responseDTO.setId(customer.getId());
            responseDTO.setEmail(customer.getEmail());
            responseDTO.setName(customer.getName());
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @PostMapping("/{customerId}/update")
    public ResponseEntity<String> updateCustomerData(
            @PathVariable Integer customerId,
            @RequestBody @Valid Customer updatedCustomer) {
        return customerService.updateCustomerData(customerId, updatedCustomer);
    }

    @PutMapping("/{customerId}/update-member-card")
    public ResponseEntity<String> updateMemberCard(
            @PathVariable Integer customerId,
            @RequestBody Map<String, Integer> request) {
        Integer memberCardId = request.get("idMemberCard");
        return customerService.updateMemberCard(customerId, memberCardId);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String newPassword = payload.get("newPassword");
        String confirmPassword = payload.get("confirmPassword");

        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Las contraseñas no coinciden");
        }

        try {
            Customer customer = customerService.findByEmail(email);
            if (customer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }

            customer.setPassword(newPassword);
            customerService.updateCustomerPassword(customer);

            return ResponseEntity.ok("Contraseña cambiada exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCustomer(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        try {
            boolean deleted = customerService.deleteCustomerByEmail(email);
            if (deleted) {
                return ResponseEntity.ok("Usuario eliminado exitosamente");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error eliminando el usuario: " + e.getMessage());
        }
    }
}
