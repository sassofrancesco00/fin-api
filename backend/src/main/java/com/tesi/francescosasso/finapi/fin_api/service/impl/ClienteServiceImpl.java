package com.tesi.francescosasso.finapi.fin_api.service.impl;

import com.tesi.francescosasso.finapi.fin_api.domain.Cliente;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.ClienteDTO;
import com.tesi.francescosasso.finapi.fin_api.repo.ClienteRepo;
import com.tesi.francescosasso.finapi.fin_api.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
@Service
public class ClienteServiceImpl implements ClienteService {

    @Autowired
    private ClienteRepo clienteRepository;

    @Override
    public List<ClienteDTO> findAll() {
        return clienteRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<ClienteDTO> findById(Long id) {
        return clienteRepository.findById(id).map(this::toDTO);
    }

    @Override
    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    private ClienteDTO toDTO(Cliente c) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(c.getId());
        dto.setNome(c.getNome());
        dto.setCodiceFiscale(c.getCodiceFiscale());
        dto.setTelefono(c.getTelefono());
        dto.setEmail(c.getEmail());
        return dto;
    }
}
