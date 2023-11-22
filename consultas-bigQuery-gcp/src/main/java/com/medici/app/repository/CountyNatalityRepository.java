package com.medici.app.repository;

import com.medici.app.entity.CountyNatality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountyNatalityRepository extends JpaRepository<CountyNatality, Long> {
}
