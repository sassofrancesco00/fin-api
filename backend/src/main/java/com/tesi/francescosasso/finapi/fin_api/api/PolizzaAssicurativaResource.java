package com.tesi.francescosasso.finapi.fin_api.api;

import com.tesi.francescosasso.finapi.fin_api.domain.PolizzaAssicurativa;
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
    public List<PolizzaAssicurativa> getAll() {
        return polizzaService.findAll();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<PolizzaAssicurativa> getByCliente(@PathVariable Long clienteId) {
        return polizzaService.findByClienteId(clienteId);
    }

    @PostMapping
    public PolizzaAssicurativa create(@RequestBody PolizzaAssicurativa polizza) {
        return polizzaService.save(polizza);
    }
}
