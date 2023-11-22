package com.medici.app.service;

import com.medici.app.dto.AdminRequest;
import com.medici.app.entity.Admin;
import com.medici.app.repository.AdminRepository;
import com.medici.app.service.injectdependency.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    @Override
    public boolean adminExistsByUsername(String username) {
        return adminRepository.existsByUserAdmin(username);
    }

}
