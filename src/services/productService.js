import supabase from '../supabaseClient';

/**
 * Fetch all products with optional sorting
 */
export const fetchProducts = async (sortField = 'name', sortDirection = 'asc') => {
  try {
    console.log('Fetching products with sorting:', sortField, sortDirection);
    
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .order(sortField, { ascending: sortDirection === 'asc' });
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    console.log(`Successfully fetched ${data?.length || 0} products`);
    return { success: true, data };
  } catch (error) {
    console.error('Error in fetchProducts service:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (productId) => {
  try {
    console.log('Fetching product by ID:', productId);
    
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('product_id', productId)
      .single();
    
    if (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
    
    console.log('Successfully fetched product:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error in fetchProductById service:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add a new product
 */
export const addProduct = async (productData) => {
  try {
    console.log('Adding new product:', productData);
    
    // Ensure we have a UUID for the product
    const newProduct = {
      ...productData,
      product_id: productData.product_id || crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('product')
      .insert([newProduct])
      .select();
    
    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }
    
    console.log('Successfully added product:', data);
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error in addProduct service:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (productId, productData) => {
  try {
    console.log('Updating product:', productId, productData);
    
    const { data, error } = await supabase
      .from('product')
      .update(productData)
      .eq('product_id', productId)
      .select();
    
    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }
    
    console.log('Successfully updated product:', data);
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error in updateProduct service:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (productId) => {
  try {
    console.log('Deleting product:', productId);
    
    const { error } = await supabase
      .from('product')
      .delete()
      .eq('product_id', productId);
    
    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
    
    console.log('Successfully deleted product');
    return { success: true };
  } catch (error) {
    console.error('Error in deleteProduct service:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get product type name from type ID
 */
export const getProductTypeName = (typeId) => {
  switch (typeId) {
    case 1:
      return 'Nutrition';
    case 2:
      return 'Equipment';
    case 3:
      return 'Clothing';
    default:
      return 'Unknown';
  }
};

/**
 * Format currency for display
 */
export const formatCurrency = (value) => {
  if (!value && value !== 0) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}; 