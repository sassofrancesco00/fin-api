package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tipo_id", nullable = false)
    private TipoInvestimento tipo;

    @Column(nullable = false)
    private String nomeStrumento;

    @ManyToOne
    @JoinColumn(name = "rischio_id", nullable = false)
    private LivelloRischio rischio;

    private Double rendimentoMedioAtteso;

    // Getters & Setters
}

