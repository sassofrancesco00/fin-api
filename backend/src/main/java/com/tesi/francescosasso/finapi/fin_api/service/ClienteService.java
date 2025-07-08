package com.tesi.francescosasso.finapi.fin_api.service;

import com.tesi.francescosasso.finapi.fin_api.domain.Cliente;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.ClienteDTO;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.ClienteStatsDTO;

import java.util.List;
import java.util.Optional;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
public interface ClienteService {

    List<ClienteDTO> findAll();

    Optional<ClienteDTO> findById(Long id);

    Cliente save(Cliente cliente);

    ClienteStatsDTO getClientiStats();

}
