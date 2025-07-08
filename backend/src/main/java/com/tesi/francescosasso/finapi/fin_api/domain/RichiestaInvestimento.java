package com.tesi.francescosasso.finapi.fin_api.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
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

    // Helper
    public String getDescrizioneCompleta() {
        return String.format("Investimento %s - Cliente: %s %s - Importo: %.2f",
                investimento != null ? investimento.getNomeStrumento() : "N/A",
                richiesta != null && richiesta.getCliente() != null ? richiesta.getCliente().getFirstname() : "N/A",
                richiesta != null && richiesta.getCliente() != null ? richiesta.getCliente().getLastname() : "N/A",
                importoInvestito != null ? importoInvestito : 0.0);
    }

    public boolean isCompleta() {
        return richiesta != null && investimento != null &&
                importoInvestito != null && importoInvestito > 0 &&
                durataMesi != null && durataMesi > 0;
    }}

