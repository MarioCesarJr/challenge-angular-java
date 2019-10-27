package com.store.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.api.model.Product;
import com.store.api.repository.product.ProductRepositoryQuery;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryQuery {
	
	Optional<Product> findByName(String name);

}
