package com.store.api.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.store.api.model.Product;
import com.store.api.repository.ProductRepository;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;
	
	@GetMapping
	public List<Product> list() throws IOException {
		return this.productRepository.findAll();
	}

	@PostMapping("/image")
	public String upload(@RequestParam MultipartFile image) throws IOException {

		OutputStream out = new FileOutputStream("./src/main/resources/static/images/" + image.getOriginalFilename());
		out.write(image.getBytes());
		out.close();

		return "OK";
	}

	@GetMapping("/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable Long id) {
		Optional<Product> product = this.productRepository.findById(id);

		if (product.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(product.get());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Product add(@Valid @RequestBody Product product) {
		Optional<Product> productExists = this.productRepository.findByName(product.getName());

		if (productExists.isPresent()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe um produto com este nome");
		}

		return this.productRepository.save(product);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remove(@PathVariable Long id) {
		this.productRepository.deleteById(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Product> update(@PathVariable Long id, @Valid @RequestBody Product product) {
		Product saveProduct = this.productRepository.findById(id)
				.orElseThrow(() -> new EmptyResultDataAccessException(1));
		;
		BeanUtils.copyProperties(product, saveProduct, "id");

		this.productRepository.save(saveProduct);
		return ResponseEntity.ok(saveProduct);
	}

}
