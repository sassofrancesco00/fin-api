package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;

@Entity
public class LivelloRischio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codice; // BASSO, MEDIO, ALTO

    private String descrizione;

    // Getters & Setters
}

