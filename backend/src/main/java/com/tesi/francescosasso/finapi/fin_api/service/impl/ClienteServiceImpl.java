package com.tesi.francescosasso.finapi.fin_api.service.impl;

import com.tesi.francescosasso.finapi.fin_api.domain.Cliente;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.ClienteDTO;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.ClienteStatsDTO;
import com.tesi.francescosasso.finapi.fin_api.repo.ClienteRepo;
import com.tesi.francescosasso.finapi.fin_api.service.ClienteService;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepo clienteRepository;

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


    @Override
    public ClienteStatsDTO getClientiStats() {
        List<Cliente> clienti = clienteRepository.findAll();

        long totalClienti = clienti.size();

        // Implementa la logica per determinare i clienti attivi
        // Esempio: clienti con almeno un login negli ultimi 30 giorni
        long clientiAttivi = clienti.stream()
                .filter(this::isClienteAttivo)
                .count();

        // Implementa la logica per determinare i clienti con investimenti
        // Esempio: clienti che hanno almeno un investimento
        long clientiConInvestimenti = clienti.stream()
                .filter(this::hasInvestimenti)
                .count();

        // Implementa la logica per determinare i clienti con polizze
        // Esempio: clienti che hanno almeno una polizza
        long clientiConPolizze = clienti.stream()
                .filter(this::hasPolizze)
                .count();

        return new ClienteStatsDTO(totalClienti, clientiAttivi, clientiConInvestimenti, clientiConPolizze);
    }


    // Metodi helper per determinare lo stato del cliente
    // Dovrai implementare questi metodi in base alla tua logica di business
    private boolean isClienteAttivo(Cliente cliente) {
        // Implementa la logica per determinare se un cliente è attivo
        // Ad esempio, verifica se ha fatto login negli ultimi 30 giorni
        // Per ora restituisco true per tutti i clienti
        return true;
    }

    private boolean hasInvestimenti(Cliente cliente) {
        // Implementa la logica per verificare se il cliente ha investimenti
        // Dovrai accedere al repository degli investimenti
        // Per ora restituisco false per tutti i clienti
        return false;
    }

    private boolean hasPolizze(Cliente cliente) {
        // Implementa la logica per verificare se il cliente ha polizze
        // Dovrai accedere al repository delle polizze
        // Per ora restituisco false per tutti i clienti
        return false;
    }

    private ClienteDTO toDTO(Cliente c) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(c.getId());
        dto.setNome(c.getFirstname());
        dto.setCognome(c.getLastname());
        dto.setCodiceFiscale(c.getCodiceFiscale());
        dto.setTelefono(c.getTelefono());
        dto.setEmail(c.getEmail());
        return dto;
    }
}
