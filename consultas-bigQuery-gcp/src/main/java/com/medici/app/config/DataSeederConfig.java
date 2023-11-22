package com.medici.app.config;

import com.medici.app.entity.Admin;
import com.medici.app.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataSeederConfig implements CommandLineRunner {

    private final AdminRepository adminRepository;

    @Override
    public void run(String... args) throws Exception {
        this.createAdmin();
    }

    private void createAdmin() {
        Admin admin = new Admin();
        admin.setId(1L);
        admin.setUserAdmin("admin@gmail.com");
        adminRepository.save(admin);
    }
}
