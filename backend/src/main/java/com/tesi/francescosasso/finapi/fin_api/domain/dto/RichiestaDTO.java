package com.tesi.francescosasso.finapi.fin_api.domain.dto;

import lombok.Data;

import java.time.LocalDate;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */

@Data
public class RichiestaDTO {
    private Long id;
    private Long clienteId;
    private Integer userId;
    private LocalDate dataInserimento;
    private String stato;
    private String motivazioneRespinta;

    // Getters and Setters
}
