package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestimentoRepo extends JpaRepository<Investimento, Long> {
}
