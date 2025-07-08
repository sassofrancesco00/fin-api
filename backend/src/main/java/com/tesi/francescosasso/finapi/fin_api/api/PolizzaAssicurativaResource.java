package com.tesi.francescosasso.finapi.fin_api.api;

import com.tesi.francescosasso.finapi.fin_api.domain.PolizzaAssicurativa;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.PolizzaAssicurativaDTO;
import com.tesi.francescosasso.finapi.fin_api.service.PolizzaAssicurativaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */

@RestController
@RequestMapping("/api/v1/polizze")
@RequiredArgsConstructor
public class PolizzaAssicurativaResource {

    private final  PolizzaAssicurativaService polizzaService;

    @GetMapping
    public List<PolizzaAssicurativaDTO> getAll() {
        return polizzaService.findAll();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<PolizzaAssicurativaDTO> getByCliente(@PathVariable Long clienteId) {
        return polizzaService.findByClienteId(clienteId);
    }

    @PostMapping
    public PolizzaAssicurativa create(@RequestBody PolizzaAssicurativa polizza) {
        return polizzaService.save(polizza);
    }
}
