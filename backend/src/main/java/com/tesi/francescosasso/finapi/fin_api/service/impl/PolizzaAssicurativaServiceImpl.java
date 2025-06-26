package com.tesi.francescosasso.finapi.fin_api.service.impl;

import com.tesi.francescosasso.finapi.fin_api.domain.PolizzaAssicurativa;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.PolizzaAssicurativaDTO;
import com.tesi.francescosasso.finapi.fin_api.repo.PolizzaAssicurativaRepo;
import com.tesi.francescosasso.finapi.fin_api.service.PolizzaAssicurativaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
@Service
public class PolizzaAssicurativaServiceImpl implements PolizzaAssicurativaService {
    private PolizzaAssicurativaRepo  polizzaRepository;

    @Override
    public List<PolizzaAssicurativaDTO> findAll() {
        return polizzaRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<PolizzaAssicurativaDTO> findByClienteId(Long clienteId) {
        return polizzaRepository.findByClienteId(clienteId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public PolizzaAssicurativa save(PolizzaAssicurativa polizza) {
        return polizzaRepository.save(polizza);
    }

    private PolizzaAssicurativaDTO toDTO(PolizzaAssicurativa p) {
        PolizzaAssicurativaDTO dto = new PolizzaAssicurativaDTO();
        dto.setId(p.getId());
        dto.setClienteId(p.getCliente().getId());
        dto.setUserId(p.getUser().getId());
        dto.setTipoPolizza(p.getTipoPolizza().getCodice());
        dto.setPremioAnnuo(p.getPremioAnnuo());
        dto.setDataInizio(p.getDataInizio());
        dto.setDurataAnni(p.getDurataAnni());
        dto.setBeneficiario(p.getBeneficiario());
        dto.setStato(p.getStato().getCodice());
        dto.setMotivazioneRespinta(p.getMotivazioneRespinta());
        return dto;
    }

}
