package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.Richiesta;
import com.tesi.francescosasso.finapi.fin_api.domain.StatoPratica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RichiestaRepo extends JpaRepository<Richiesta, Long> {
    List<Richiesta> findByClienteId(Long clienteId);

    List<Richiesta> findByUserId(Long userId);
}
