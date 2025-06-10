package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.LivelloRischio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LivelloRischioRepo extends JpaRepository<LivelloRischio, Long> {
    Optional<LivelloRischio> findByCodice(String codice);
}
