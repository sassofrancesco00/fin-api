package com.tesi.francescosasso.finapi.fin_api.api;

import com.tesi.francescosasso.finapi.fin_api.domain.Cliente;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.ClienteDTO;
import com.tesi.francescosasso.finapi.fin_api.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
@RestController
@RequestMapping("/api/v1/clienti")
@RequiredArgsConstructor

public class ClienteResource {

    private final ClienteService clienteService;

    @GetMapping
    public List<ClienteDTO> getAllClienti() {
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public ClienteDTO getCliente(@PathVariable Long id) {
        return clienteService.findById(id).orElse(null);
    }

    @PostMapping
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteService.save(cliente);
    }
}
