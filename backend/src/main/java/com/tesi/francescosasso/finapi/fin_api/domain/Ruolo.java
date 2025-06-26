package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Ruolo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String codice; // CONSULENTE, SUPERVISORE

    private String descrizione;

    // Getters & Setters
}

