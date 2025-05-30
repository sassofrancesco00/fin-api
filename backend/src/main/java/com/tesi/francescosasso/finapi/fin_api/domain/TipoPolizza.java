package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;

@Entity
public class TipoPolizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codice; // VITA, INFORTUNI, ecc.

    private String descrizione;

    // Getters & Setters
}

