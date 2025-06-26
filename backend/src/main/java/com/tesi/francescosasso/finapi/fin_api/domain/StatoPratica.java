package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StatoPratica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String codice; // IN_REVISIONE, APPROVATA, RESPINTA

    private String descrizione;

    // Getters & Setters
}

