package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepo extends JpaRepository<Cliente, Long> {
}
