package org.example.repositories;

import com.courses.server.entity.Expert;
import com.courses.server.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpertRepository extends JpaRepository<Expert, Long> {
    Page<Expert> findAllByStatus(boolean status, Pageable pageable);
    
	Page<Expert> findAllByJobTitleContainingOrDescriptionContaining(String title, String description, Pageable pageable);

	Optional<Expert> findByUser(User user);
}