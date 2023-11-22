package com.medici.app.repository;


import com.medici.app.entity.CountyNatalityBase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultRepository extends JpaRepository<CountyNatalityBase, Long> {

    boolean existsByNameConsultAndNameUser(String nameConsult, String nameUser);
}
