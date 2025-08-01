package com.tesi.francescosasso.finapi.fin_api.api;

import com.tesi.francescosasso.finapi.fin_api.domain.Richiesta;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.RichiestaDTO;
import com.tesi.francescosasso.finapi.fin_api.service.RichiestaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
@RestController
@RequestMapping("/api/richieste")
public class RichiestaResource {

    private RichiestaService richiestaService;

    @GetMapping
    public List<RichiestaDTO> getAll() {
        return richiestaService.findAll();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<RichiestaDTO> getByCliente(@PathVariable Long clienteId) {
        return richiestaService.findByClienteId(clienteId);
    }

    @PostMapping
    public Richiesta create(@RequestBody Richiesta richiesta) {
        return richiestaService.save(richiesta);
    }
}
