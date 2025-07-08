package com.tesi.francescosasso.finapi.fin_api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteStatsDTO {
    private long totalClienti;
    private long clientiAttivi;
    private long clientiConInvestimenti;
    private long clientiConPolizze;
}
