package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;

@Entity
public class RichiestaInvestimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "richiesta_id", nullable = false)
    private Richiesta richiesta;

    @ManyToOne
    @JoinColumn(name = "investimento_id", nullable = false)
    private Investimento investimento;

    private Double importoInvestito;

    private Integer durataMesi;

    // Getters & Setters
}

