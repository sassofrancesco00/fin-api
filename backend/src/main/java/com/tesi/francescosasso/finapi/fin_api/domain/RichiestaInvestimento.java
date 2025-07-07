package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class RichiestaInvestimento {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private User user;

    @ManyToOne
    private StatoPratica stato;

    private Double importo;
    private String tipoInvestimento; // Oppure enum
    private LocalDate dataInserimento;
    private LocalDate dataModifica;
    private String motivazioneRespinta;
}

