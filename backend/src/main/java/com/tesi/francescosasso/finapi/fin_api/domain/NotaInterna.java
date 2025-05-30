package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class NotaInterna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "richiesta_id")
    private Richiesta richiesta;

    @ManyToOne
    @JoinColumn(name = "polizza_id")
    private PolizzaAssicurativa polizza;

    @ManyToOne
    @JoinColumn(name = "autore_id", nullable = false)
    private User autore;

    private String testo;

    private LocalDateTime dataCreazione = LocalDateTime.now();

    // Getters & Setters
}

