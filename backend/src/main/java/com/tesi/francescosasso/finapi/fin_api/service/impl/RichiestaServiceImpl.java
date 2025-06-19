package com.tesi.francescosasso.finapi.fin_api.service.impl;

import com.tesi.francescosasso.finapi.fin_api.domain.Richiesta;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.RichiestaDTO;
import com.tesi.francescosasso.finapi.fin_api.repo.RichiestaRepo;
import com.tesi.francescosasso.finapi.fin_api.service.RichiestaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */

@Service
public class RichiestaServiceImpl implements RichiestaService {

    @Autowired
    private RichiestaRepo richiestaRepository;

    @Override
    public List<RichiestaDTO> findAll() {
        return richiestaRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<RichiestaDTO> findByClienteId(Long clienteId) {
        return richiestaRepository.findByClienteId(clienteId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public Richiesta save(Richiesta richiesta) {
        return richiestaRepository.save(richiesta);
    }

    private RichiestaDTO toDTO(Richiesta r) {
        RichiestaDTO dto = new RichiestaDTO();
        dto.setId(r.getId());
        dto.setClienteId(r.getCliente().getId());
        dto.setUserId(r.getUser().getId());
        dto.setDataInserimento(r.getDataInserimento());
        dto.setStato(r.getStato().getCodice());
        dto.setMotivazioneRespinta(r.getMotivazioneRespinta());
        return dto;
    }
}
