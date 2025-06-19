package com.tesi.francescosasso.finapi.fin_api.service;

import com.tesi.francescosasso.finapi.fin_api.domain.Richiesta;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.RichiestaDTO;

import java.util.List;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
public interface RichiestaService {
    List<RichiestaDTO> findAll();

    List<RichiestaDTO> findByClienteId(Long clienteId);

    Richiesta save(Richiesta richiesta);
}
