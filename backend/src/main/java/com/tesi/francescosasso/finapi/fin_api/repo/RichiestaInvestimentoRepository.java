package com.tesi.francescosasso.finapi.fin_api.repository;

import com.tesi.francescosasso.finapi.fin_api.domain.RichiestaInvestimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
@Repository
public interface RichiestaInvestimentoRepository extends JpaRepository<RichiestaInvestimento, Long> {

    /**
     * Trova tutte le richieste di investimento per un cliente specifico
     */
    List<RichiestaInvestimento> findByRichiesta_Cliente_Id(Long clienteId);

    /**
     * Trova tutte le richieste di investimento per una richiesta specifica
     */
    List<RichiestaInvestimento> findByRichiesta_Id(Long richiestaId);

    /**
     * Trova tutte le richieste di investimento per un investimento specifico
     */
    List<RichiestaInvestimento> findByInvestimento_Id(Long investimentoId);

    /**
     * Conta le richieste di investimento per un cliente
     */
    Long countByRichiesta_Cliente_Id(Long clienteId);

    /**
     * Trova le richieste di investimento per tipo di investimento
     */
    List<RichiestaInvestimento> findByInvestimento_Tipo_Id(Long tipoInvestimentoId);

    /**
     * Trova le richieste di investimento per livello di rischio
     */
    List<RichiestaInvestimento> findByInvestimento_Rischio_Id(Long livelloRischioId);

    /**
     * Trova le richieste di investimento per stato pratica
     */
    List<RichiestaInvestimento> findByRichiesta_Stato_Id(Long statoPraticaId);

    /**
     * Query personalizzata per ottenere il totale investito per cliente
     */
    @Query("SELECT COALESCE(SUM(ri.importoInvestito), 0) FROM RichiestaInvestimento ri WHERE ri.richiesta.cliente.id = :clienteId")
    Double getTotalImportoInvestitoByCliente(@Param("clienteId") Long clienteId);

    /**
     * Query personalizzata per ottenere le richieste di investimento con importo maggiore di un valore
     */
    @Query("SELECT ri FROM RichiestaInvestimento ri WHERE ri.importoInvestito > :importoMinimo")
    List<RichiestaInvestimento> findByImportoInvestitoGreaterThan(@Param("importoMinimo") Double importoMinimo);

    /**
     * Query personalizzata per ottenere le richieste di investimento con durata in un range
     */
    @Query("SELECT ri FROM RichiestaInvestimento ri WHERE ri.durataMesi BETWEEN :durataMin AND :durataMax")
    List<RichiestaInvestimento> findByDurataMesiBetween(@Param("durataMin") Integer durataMin, @Param("durataMax") Integer durataMax);

    /**
     * Query personalizzata per ottenere statistiche per cliente
     */
    @Query("SELECT COUNT(ri), COALESCE(SUM(ri.importoInvestito), 0), COALESCE(AVG(ri.importoInvestito), 0) " +
            "FROM RichiestaInvestimento ri WHERE ri.richiesta.cliente.id = :clienteId")
    Object[] getStatisticheByCliente(@Param("clienteId") Long clienteId);
}