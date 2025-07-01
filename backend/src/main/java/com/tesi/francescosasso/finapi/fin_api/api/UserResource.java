package com.tesi.francescosasso.finapi.fin_api.api;


/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */


import com.tesi.francescosasso.finapi.fin_api.domain.User;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.UserDTO;
import com.tesi.francescosasso.finapi.fin_api.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserResource {


    private UserService userService;

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Integer id) {
        return userService.findById(id).orElse(null);
    }
}
