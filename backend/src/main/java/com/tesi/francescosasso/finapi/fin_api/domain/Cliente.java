package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;

@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(name = "codice_fiscale", unique = true, nullable = false)
    private String codiceFiscale;

    private String telefono;

    private String email;

    // Getters & Setters
}

