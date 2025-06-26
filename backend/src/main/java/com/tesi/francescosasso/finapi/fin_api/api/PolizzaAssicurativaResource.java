package com.tesi.francescosasso.finapi.fin_api.api;

import com.tesi.francescosasso.finapi.fin_api.domain.PolizzaAssicurativa;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.PolizzaAssicurativaDTO;
import com.tesi.francescosasso.finapi.fin_api.service.PolizzaAssicurativaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */

@RestController
@RequestMapping("/api/polizze")
public class PolizzaAssicurativaResource {

    private PolizzaAssicurativaService polizzaService;

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
