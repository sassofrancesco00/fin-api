package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.StatoPratica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StatoPraticaRepo extends JpaRepository<StatoPratica, Long> {
    Optional<StatoPratica> findByCodice(String codice);
}
