package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.TipoInvestimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoInvestimentoRepo extends JpaRepository<TipoInvestimento, Long> {
    Optional<TipoInvestimento> findByCodice(String codice);
}
