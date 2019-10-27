package com.store.api.repository.product;

import java.util.List;

import com.store.api.model.Product;
import com.store.api.repository.filter.ProductFilter;

public interface ProductRepositoryQuery {
	
	public List<Product> filter(ProductFilter productFilter);

}
