import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaExclamationCircle, FaImage, 
  FaShoppingCart, FaSearch, FaSort, FaBoxOpen, FaThLarge, FaList } from 'react-icons/fa';
import { verifyAdminPassword } from '../../../services/adminService';
import { fetchProducts, addProduct, updateProduct, deleteProduct, getProductTypeName, formatCurrency } from '../../../services/productService';
import './shop.css';

const Shop = () => {
  const navigate = useNavigate();
  
  // Products state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    type: 1,
    price: '',
    description: '',
    image_url: '',
    stock_quantity: '',
  });
  
  // Current product being edited/deleted
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // Admin verification
  const [adminPassword, setAdminPassword] = useState('');
  const [actionError, setActionError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  
  // View mode (table/card)
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    loadProducts();
  }, [sortField, sortDirection]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchProducts(sortField, sortDirection);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to load products');
      }
      
      setProducts(result.data || []);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = name === 'price' ? parseFloat(value) : parseInt(value, 10);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Modal toggle functions
  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
    if (!showAddModal) {
      // Reset form when opening modal
      setFormData({
        name: '',
        type: 1,
        price: '',
        description: '',
        image_url: '',
        stock_quantity: '',
      });
      setActionError(null);
    }
  };

  const toggleEditModal = (product = null) => {
    setShowEditModal(!showEditModal);
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name || '',
        type: product.type || 1,
        price: product.price || '',
        description: product.description || '',
        image_url: product.image_url || '',
        stock_quantity: product.stock_quantity || '',
      });
      setActionError(null);
    }
  };

  const toggleDeleteModal = (product = null) => {
    setShowDeleteModal(!showDeleteModal);
    if (product) {
      setCurrentProduct(product);
      setActionError(null);
      setAdminPassword('');
    }
  };

  // CRUD operations
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      setActionError(null);
      
      // Validate form data
      if (!formData.name || !formData.price) {
        setActionError('Please fill in all required fields (name and price).');
        return;
      }
      
      // Prepare product data
      const productData = {
        name: formData.name,
        type: parseInt(formData.type, 10),
        price: parseFloat(formData.price),
        description: formData.description || null,
        image_url: formData.image_url || null,
        stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity, 10) : null,
      };
      
      // Add product using service
      const result = await addProduct(productData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to add product');
      }
      
      // Close modal and refresh products
      toggleAddModal();
      loadProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      setActionError(`Failed to add product: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!currentProduct) return;
    
    try {
      setActionLoading(true);
      setActionError(null);
      
      // Validate form data
      if (!formData.name || !formData.price) {
        setActionError('Please fill in all required fields (name and price).');
        return;
      }
      
      // Prepare product data
      const productData = {
        name: formData.name,
        type: parseInt(formData.type, 10),
        price: parseFloat(formData.price),
        description: formData.description || null,
        image_url: formData.image_url || null,
        stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity, 10) : null,
      };
      
      // Update product using service
      const result = await updateProduct(currentProduct.product_id, productData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update product');
      }
      
      // Close modal and refresh products
      toggleEditModal();
      loadProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      setActionError(`Failed to update product: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!currentProduct) return;
    
    try {
      setActionLoading(true);
      setActionError(null);
      
      // Verify admin password first
      const verificationResult = await verifyAdminPassword(adminPassword);
      
      if (!verificationResult.success) {
        setActionError('Invalid admin password. Please try again.');
        return;
      }
      
      // Delete product using service
      const result = await deleteProduct(currentProduct.product_id);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete product');
      }
      
      // Close modal and refresh products
      toggleDeleteModal();
      loadProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setActionError(`Failed to delete product: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Filtering and sorting functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Toggle view mode
  const toggleViewMode = (mode) => {
    setViewMode(mode);
    // Update shop content width based on view mode
    const shopContent = document.querySelector('.shop-content');
    if (shopContent) {

    }
  };

  // Placeholder image handler
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/images/placeholder-product.jpg';
  };

  if (loading && products.length === 0) {
    return (
      <AdminLayout activeSection="shop">
        <div className="shop-content">
          <div className="shop-loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection="shop">
      <div className="shop-content">
        <div className="shop-header">
          <h2>Product Management</h2>
          <div className="shop-actions">
            <div className="view-toggle">
              <button 
                className={viewMode === 'table' ? 'active' : ''} 
                onClick={() => toggleViewMode('table')}
                title="Table view"
              >
                <FaList />
              </button>
              <button 
                className={viewMode === 'card' ? 'active' : ''} 
                onClick={() => toggleViewMode('card')}
                title="Card view"
              >
                <FaThLarge />
              </button>
            </div>
            <button 
              className="btn btn-primary add-product-btn" 
              onClick={toggleAddModal}
            >
              <FaPlus /> Add Product
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <FaExclamationCircle /> {error}
          </div>
        )}

        <div className="shop-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <div className="filter-info">
            <span>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            {viewMode === 'table' ? (
              <div className="products-table-container">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('name')}>
                        Name {sortField === 'name' && (
                          <FaSort className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`} />
                        )}
                      </th>
                      <th onClick={() => handleSort('type')}>
                        Type {sortField === 'type' && (
                          <FaSort className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`} />
                        )}
                      </th>
                      <th onClick={() => handleSort('price')}>
                        Price {sortField === 'price' && (
                          <FaSort className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`} />
                        )}
                      </th>
                      <th onClick={() => handleSort('stock_quantity')}>
                        Stock {sortField === 'stock_quantity' && (
                          <FaSort className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`} />
                        )}
                      </th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map(product => (
                      <tr key={product.product_id}>
                        <td>{product.name}</td>
                        <td>{getProductTypeName(product.type)}</td>
                        <td>{formatCurrency(product.price)}</td>
                        <td>{product.stock_quantity !== null ? product.stock_quantity : 'N/A'}</td>
                        <td>
                          {product.image_url ? (
                            <div className="product-image-thumbnail">
                              <img 
                                src={product.image_url} 
                                alt={product.name} 
                                onError={handleImageError}
                              />
                            </div>
                          ) : (
                            <span className="no-image"><FaImage /> No image</span>
                          )}
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn edit-btn" 
                              onClick={() => toggleEditModal(product)}
                              title="Edit product"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="action-btn delete-btn" 
                              onClick={() => toggleDeleteModal(product)}
                              title="Delete product"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="card-view">
                {currentProducts.map(product => (
                  <div className="product-card" key={product.product_id}>
                    <div className="product-card-image">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="no-image-card">
                          <FaImage />
                        </div>
                      )}
                    </div>
                    <div className="product-card-content">
                      <h3 className="product-card-title">{product.name}</h3>
                      <span className="product-card-type">{getProductTypeName(product.type)}</span>
                      <div className="product-card-price">{formatCurrency(product.price)}</div>
                      <div className="product-card-stock">
                        Stock: {product.stock_quantity !== null ? product.stock_quantity : 'N/A'}
                      </div>
                      <div className="product-card-actions">
                        <button 
                          className="action-btn edit-btn" 
                          onClick={() => toggleEditModal(product)}
                          title="Edit product"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="action-btn delete-btn" 
                          onClick={() => toggleDeleteModal(product)}
                          title="Delete product"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                
                <div className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-products">
            <FaBoxOpen className="no-products-icon" />
            <p>{searchTerm ? 'No products match your search.' : 'No products available.'}</p>
            {searchTerm && (
              <button className="btn btn-secondary" onClick={() => setSearchTerm('')}>
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="close-btn" onClick={toggleAddModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddProduct}>
              {actionError && (
                <div className="alert alert-error">
                  <FaExclamationCircle /> {actionError}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Product Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="type">Product Type*</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value={1}>Nutrition</option>
                  <option value={2}>Equipment</option>
                  <option value={3}>Clothing</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Price ($)*</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleNumberInputChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="stock_quantity">Stock Quantity</label>
                <input
                  type="number"
                  id="stock_quantity"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleNumberInputChange}
                  min="0"
                  placeholder="Enter stock quantity"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="image_url">Image URL</label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter product description"
                />
              </div>
              
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={toggleAddModal}
                  disabled={actionLoading}
                >
                  <FaTimes /> Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <>
                      <div className="spinner-sm"></div> Adding...
                    </>
                  ) : (
                    <>
                      <FaSave /> Add Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button className="close-btn" onClick={toggleEditModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdateProduct}>
              {actionError && (
                <div className="alert alert-error">
                  <FaExclamationCircle /> {actionError}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="edit-name">Product Name*</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-type">Product Type*</label>
                <select
                  id="edit-type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value={1}>Nutrition</option>
                  <option value={2}>Equipment</option>
                  <option value={3}>Clothing</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-price">Price ($)*</label>
                <input
                  type="number"
                  id="edit-price"
                  name="price"
                  value={formData.price}
                  onChange={handleNumberInputChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-stock_quantity">Stock Quantity</label>
                <input
                  type="number"
                  id="edit-stock_quantity"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleNumberInputChange}
                  min="0"
                  placeholder="Enter stock quantity"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-image_url">Image URL</label>
                <input
                  type="url"
                  id="edit-image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter product description"
                />
              </div>
              
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={toggleEditModal}
                  disabled={actionLoading}
                >
                  <FaTimes /> Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <>
                      <div className="spinner-sm"></div> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Delete Product</h3>
              <button className="close-btn" onClick={toggleDeleteModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {actionError && (
                <div className="alert alert-error">
                  <FaExclamationCircle /> {actionError}
                </div>
              )}
              
              <p className="confirm-message">
                Are you sure you want to delete <strong>{currentProduct?.name}</strong>?
                This action cannot be undone.
              </p>
              
              <div className="form-group">
                <label htmlFor="admin-password">Admin Password (required for deletion)</label>
                <input
                  type="password"
                  id="admin-password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={toggleDeleteModal}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={handleDeleteProduct}
                disabled={actionLoading || !adminPassword}
              >
                {actionLoading ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Shop;
