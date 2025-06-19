package com.tesi.francescosasso.finapi.fin_api.domain.dto;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
public class PolizzaAssicurativaDTO {
    private Long id;
    private Long clienteId;
    private Long userId;
    private String tipoPolizza;
    private Double premioAnnuo;
    private LocalDate dataInizio;
    private Integer durataAnni;
    private String beneficiario;
    private String stato;
    private String motivazioneRespinta;

    // Getters and Setters
}
