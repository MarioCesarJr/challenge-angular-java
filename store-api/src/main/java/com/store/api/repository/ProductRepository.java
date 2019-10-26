package com.store.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.api.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	Optional<Product> findByName(String name);

}
