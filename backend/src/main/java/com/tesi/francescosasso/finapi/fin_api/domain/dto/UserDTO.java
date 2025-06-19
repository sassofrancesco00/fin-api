package com.tesi.francescosasso.finapi.fin_api.domain.dto;

import lombok.Data;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */

@Data
public class UserDTO {
    private Long id;
    private String nome;
    private String email;
    private String ruolo;


    // Getters and Setters
}