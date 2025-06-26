package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class PolizzaAssicurativa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "tipo_polizza_id", nullable = false)
    private TipoPolizza tipoPolizza;

    private Double premioAnnuo;

    private LocalDate dataInizio;

    private Integer durataAnni;

    private String beneficiario;

    @ManyToOne
    @JoinColumn(name = "stato_id", nullable = false)
    private StatoPratica stato;

    private String motivazioneRespinta;

    // Getters & Setters
}
