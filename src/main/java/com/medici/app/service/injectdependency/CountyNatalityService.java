package com.medici.app.service.injectdependency;

import com.medici.app.entity.CountyNatality;

import java.util.List;

public interface CountyNatalityService {
    void save(List<CountyNatality> countyNatalities);
}
