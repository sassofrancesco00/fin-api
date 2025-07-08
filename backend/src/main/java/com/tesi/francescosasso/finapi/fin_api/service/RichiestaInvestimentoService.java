package com.tesi.francescosasso.finapi.fin_api.service;

import com.tesi.francescosasso.finapi.fin_api.domain.RichiestaInvestimento;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.RichiestaInvestimentoDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
public interface RichiestaInvestimentoService {
    @Transactional(readOnly = true)
    List<RichiestaInvestimentoDTO> findAll();

    @Transactional(readOnly = true)
    RichiestaInvestimentoDTO findById(Long id);

    @Transactional(readOnly = true)
    List<RichiestaInvestimentoDTO> findByClienteId(Long clienteId);

    @Transactional(readOnly = true)
    List<RichiestaInvestimentoDTO> findByRichiestaId(Long richiestaId);

    @Transactional(readOnly = true)
    List<RichiestaInvestimentoDTO> findByInvestimentoId(Long investimentoId);

    RichiestaInvestimento save(RichiestaInvestimento richiestaInvestimento);

    void deleteById(Long id);

    boolean existsById(Long id);

    long count();

    @Transactional(readOnly = true)
    Double getTotalImportoInvestitoByCliente(Long clienteId);

    @Transactional(readOnly = true)
    Long countByCliente(Long clienteId);
}
