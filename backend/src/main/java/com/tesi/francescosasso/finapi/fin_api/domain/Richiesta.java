package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Richiesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "data_inserimento", nullable = false)
    private LocalDate dataInserimento;

    @ManyToOne
    @JoinColumn(name = "stato_id", nullable = false)
    private StatoPratica stato;

    private String motivazioneRespinta;

    // Getters & Setters
}

