package com.tesi.francescosasso.finapi.fin_api.api;

import com.tesi.francescosasso.finapi.fin_api.domain.RichiestaInvestimento;
import com.tesi.francescosasso.finapi.fin_api.domain.dto.RichiestaInvestimentoDTO;
import com.tesi.francescosasso.finapi.fin_api.service.RichiestaInvestimentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
@RestController
@RequestMapping("/api/v1/richieste-investimento")
@RequiredArgsConstructor

public class RichiestaInvestimentoResource {

    private final RichiestaInvestimentoService richiestaInvestimentoService;

    @GetMapping
    public List<RichiestaInvestimentoDTO> getAll() {
        return richiestaInvestimentoService.findAll();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<RichiestaInvestimentoDTO> getByCliente(@PathVariable Long clienteId) {
        return richiestaInvestimentoService.findByClienteId(clienteId);
    }

    @GetMapping("/{id}")
    public RichiestaInvestimentoDTO getById(@PathVariable Long id) {
        return richiestaInvestimentoService.findById(id);
    }

    @PostMapping
    public RichiestaInvestimento create(@RequestBody RichiestaInvestimento richiestaInvestimento) {
        return richiestaInvestimentoService.save(richiestaInvestimento);
    }

    @PutMapping("/{id}")
    public RichiestaInvestimento update(@PathVariable Long id, @RequestBody RichiestaInvestimento richiestaInvestimento) {
        richiestaInvestimento.setId(id);
        return richiestaInvestimentoService.save(richiestaInvestimento);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        richiestaInvestimentoService.deleteById(id);
    }
}
