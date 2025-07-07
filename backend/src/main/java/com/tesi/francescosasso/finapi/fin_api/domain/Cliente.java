package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;
    private String lastname;

    @Column(name = "codice_fiscale", unique = true, nullable = false)
    private String codiceFiscale;

    private String telefono;

    private String email;

    // Getters & Setters
}

