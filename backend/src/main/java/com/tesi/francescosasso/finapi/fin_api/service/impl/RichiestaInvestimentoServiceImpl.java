package com.tesi.francescosasso.finapi.fin_api.service;

import com.tesi.francescosasso.finapi.fin_api.domain.RichiestaInvestimento;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.RichiestaInvestimentoDTO;
import com.tesi.francescosasso.finapi.fin_api.repository.RichiestaInvestimentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
@Service
@Transactional
@RequiredArgsConstructor
public class RichiestaInvestimentoServiceImpl implements RichiestaInvestimentoService {

    private final RichiestaInvestimentoRepository richiestaInvestimentoRepository;

    @Transactional(readOnly = true)
    @Override
    public List<RichiestaInvestimentoDTO> findAll() {
        List<RichiestaInvestimento> entities = richiestaInvestimentoRepository.findAll();
        return entities.stream()
                .map(RichiestaInvestimentoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public RichiestaInvestimentoDTO findById(Long id) {
        Optional<RichiestaInvestimento> entity = richiestaInvestimentoRepository.findById(id);
        return entity.map(RichiestaInvestimentoDTO::fromEntity).orElse(null);
    }

    @Transactional(readOnly = true)
    @Override
    public List<RichiestaInvestimentoDTO> findByClienteId(Long clienteId) {
        List<RichiestaInvestimento> entities = richiestaInvestimentoRepository.findByRichiesta_Cliente_Id(clienteId);
        return entities.stream()
                .map(RichiestaInvestimentoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public List<RichiestaInvestimentoDTO> findByRichiestaId(Long richiestaId) {
        List<RichiestaInvestimento> entities = richiestaInvestimentoRepository.findByRichiesta_Id(richiestaId);
        return entities.stream()
                .map(RichiestaInvestimentoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public List<RichiestaInvestimentoDTO> findByInvestimentoId(Long investimentoId) {
        List<RichiestaInvestimento> entities = richiestaInvestimentoRepository.findByInvestimento_Id(investimentoId);
        return entities.stream()
                .map(RichiestaInvestimentoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public RichiestaInvestimento save(RichiestaInvestimento richiestaInvestimento) {
        return richiestaInvestimentoRepository.save(richiestaInvestimento);
    }

    @Override
    public void deleteById(Long id) {
        richiestaInvestimentoRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return richiestaInvestimentoRepository.existsById(id);
    }

    @Override
    public long count() {
        return richiestaInvestimentoRepository.count();
    }

    @Transactional(readOnly = true)
    @Override
    public Double getTotalImportoInvestitoByCliente(Long clienteId) {
        return richiestaInvestimentoRepository.findByRichiesta_Cliente_Id(clienteId)
                .stream()
                .mapToDouble(ri -> ri.getImportoInvestito() != null ? ri.getImportoInvestito() : 0.0)
                .sum();
    }

    @Transactional(readOnly = true)
    @Override
    public Long countByCliente(Long clienteId) {
        return richiestaInvestimentoRepository.countByRichiesta_Cliente_Id(clienteId);
    }
}