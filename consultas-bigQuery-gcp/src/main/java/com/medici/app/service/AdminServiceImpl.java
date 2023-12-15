package com.medici.app.service;

import com.medici.app.repository.AdminRepository;
import com.medici.app.repository.ConsultRepository;
import com.medici.app.service.injectdependency.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final ConsultRepository consultRepository;

    @Override
    public boolean adminExistsByUsername(String username) {
        return adminRepository.existsByUserAdmin(username);
    }

    @Override
    public void appRest() {
        consultRepository.deleteAll();

    }

}
