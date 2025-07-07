package com.tesi.francescosasso.finapi.fin_api.domain.dto;

import lombok.Data;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */

@Data
public class ClienteDTO {
    private Long id;
    private String nome;
    private String cognome;
    private String codiceFiscale;
    private String telefono;
    private String email;


    // Getters and Setters
}