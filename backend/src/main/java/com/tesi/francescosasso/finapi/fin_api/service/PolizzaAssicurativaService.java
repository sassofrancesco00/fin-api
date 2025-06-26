package com.tesi.francescosasso.finapi.fin_api.service;

import com.tesi.francescosasso.finapi.fin_api.domain.PolizzaAssicurativa;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.PolizzaAssicurativaDTO;

import java.util.List;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
public interface PolizzaAssicurativaService {
    List<PolizzaAssicurativaDTO> findAll();

    List<PolizzaAssicurativaDTO> findByClienteId(Long clienteId);

    PolizzaAssicurativa save(PolizzaAssicurativa polizza);
}
