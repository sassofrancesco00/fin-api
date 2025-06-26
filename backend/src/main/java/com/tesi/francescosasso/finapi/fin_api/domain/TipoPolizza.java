package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TipoPolizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codice; // VITA, INFORTUNI, ecc.

    private String descrizione;

    // Getters & Setters
}

