'use client';

import { Card, CardContent, CardHeader, CardImage } from "../components/ui/card";
import { useRouter, useParams } from "next/navigation";
import { Button } from "../components/ui/button";
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  detailedDescription: string;
  features: string[];
}

interface ProductFormData {
  name: string;
  image: string;
  description: string;
  price: number;
  detailedDescription: string;
  features: string[];
}

const initialFormData: ProductFormData = {
  name: '',
  image: '',
  description: '',
  price: 0,
  detailedDescription: '',
  features: []
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const ProductForm = ({ 
  product, 
  onSave, 
  onCancel, 
  isLoading 
}: { 
  product?: Product; 
  onSave: (data: ProductFormData) => Promise<void>; 
  onCancel: () => void;
  isLoading: boolean;
}) => {
  const [formData, setFormData] = useState<ProductFormData>(
    product ? {
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      detailedDescription: product.detailedDescription,
      features: product.features
    } : initialFormData
  );
  const [featuresInput, setFeaturesInput] = useState(
    product ? product.features.join('\n') : ''
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresInput.split('\n').filter(f => f.trim() !== '');
    await onSave({ ...formData, features });
  };

  return (
    <div className="min-h-screen dark:from-zinc-700 flex items-center justify-center px-6 py-16">
      <Card className="shadow-2xl border-0 from-zinc-700 w-full max-w-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl ml-11 font-bold">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <Button variant="outline" onClick={onCancel} size="sm" className="mr-12">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl w-full mx-auto">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
                placeholder="/product-image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Detailed Description
              </label>
              <textarea
                rows={4}
                value={formData.detailedDescription}
                onChange={(e) => setFormData({...formData, detailedDescription: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Features (one per line)
              </label>
              <textarea
                rows={4}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {product ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const ProductDetailView = ({ 
  product, 
  onBack, 
  onEdit, 
  onDelete 
}: { 
  product: Product; 
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsDeleting(true);
      await onDelete();
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen from-zinc-700 flex items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-4xl w-full">
        <div className="mb-8 flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700"
            >
              {isDeleting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete
            </Button>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white dark:bg-zinc-800">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center">
              <img
                src={product.image || '/default-product.jpg'}
                alt={product.name}
                className="w-full max-w-sm rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = '/default-product.jpg';
                }}
              />
            </div>

            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                  {product.name}
                </h1>
                <p className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                  ${product.price}
                </p>
              </div>

              <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {product.detailedDescription || product.description}
              </p>

              {product.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-zinc-600 dark:text-zinc-300">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg">
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ProductNotFound = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center px-6">
      <div className="text-center">
        <Card className="shadow-2xl border-0 bg-white dark:bg-zinc-800 p-12 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Button onClick={onBack} size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Card>
      </div>
    </div>
  );
};

const ProductsListView = ({ 
  products, 
  onProductClick, 
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  isLoading 
}: { 
  products: Product[];
  onProductClick: (productId: string) => void;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  isLoading: boolean;
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      setDeletingId(product.id);
      await onDeleteProduct(product.id);
      setDeletingId(null);
    }
  };

  const handleEdit = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onEditProduct(product);
  };

  if (isLoading) {
    return (
      <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="flex justify-between items-center mb-8">
            <Button onClick={onAddProduct} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
              No products found. Add your first product!
            </p>
            <Button onClick={onAddProduct} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Add First Product
            </Button>
          </div>
        ) : (
          <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
            {products.map((product) => (
              <Card 
                key={product.id}
                className="group shadow-zinc-950/5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 relative"
                onClick={() => onProductClick(product.id)}
              >
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm"
                    onClick={(e) => handleEdit(product, e)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700"
                    onClick={(e) => handleDelete(product, e)}
                    disabled={deletingId === product.id}
                  >
                    {deletingId === product.id ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                    ) : (
                      <Trash2 className="w-3 h-3" />
                    )}
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <CardImage 
                    src={product.image || '/default-product.jpg'} 
                    alt={product.name}
                    aspectRatio="square"
                    className="mx-auto size-36"
                    onError={(e) => {
                      e.currentTarget.src = '/default-product.jpg';
                    }}
                  />

                  <h3 className="mt-6 font-medium">{product.name}</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {product.description}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default function Products() {
  const router = useRouter();
  const params = useParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'not-found' | 'add' | 'edit'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (productData: ProductFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchProducts();
        setCurrentView('list');
        window.history.pushState(null, '', '/products');
      } else {
        alert('Error creating product: ' + data.error);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProduct = async (productData: ProductFormData) => {
    if (!selectedProduct) return;
    
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...productData, id: selectedProduct.id }),
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchProducts(); 
        setCurrentView('list');
        setSelectedProduct(null);
        window.history.pushState(null, '', '/products');
      } else {
        alert('Error updating product: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchProducts(); 
        if (currentView === 'detail' && selectedProduct?.id === productId) {
          setCurrentView('list');
          setSelectedProduct(null);
          window.history.pushState(null, '', '/products');
        }
      } else {
        alert('Error deleting product: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const productId = path.split('/products/')[1];
      
      if (!productId) {
        setCurrentView('list');
        setSelectedProduct(null);
      } else {
        const product = products.find(p => p.id === productId);
        if (product) {
          setCurrentView('detail');
          setSelectedProduct(product);
        } else {
          setCurrentView('not-found');
          setSelectedProduct(null);
        }
      }
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [products]);

  const handleProductClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setCurrentView('detail');
      window.history.pushState(null, '', `/products/${productId}`);
    }
  };

  const handleBackToProducts = () => {
    setCurrentView('list');
    setSelectedProduct(null);
    window.history.pushState(null, '', '/products');
  };

  const handleAddProduct = () => {
    setCurrentView('add');
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('edit');
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setSelectedProduct(null);
  };

  switch (currentView) {
    case 'add':
      return (
        <ProductForm 
          onSave={createProduct}
          onCancel={handleCancelForm}
          isLoading={isSubmitting}
        />
      );
    
    case 'edit':
      return selectedProduct ? (
        <ProductForm 
          product={selectedProduct}
          onSave={updateProduct}
          onCancel={handleCancelForm}
          isLoading={isSubmitting}
        />
      ) : null;
    
    case 'detail':
      return selectedProduct ? (
        <ProductDetailView 
          product={selectedProduct} 
          onBack={handleBackToProducts}
          onEdit={() => handleEditProduct(selectedProduct)}
          onDelete={() => deleteProduct(selectedProduct.id)}
        />
      ) : null;
    
    case 'not-found':
      return <ProductNotFound onBack={handleBackToProducts} />;
    
    default:
      return (
        <ProductsListView 
          products={products}
          onProductClick={handleProductClick}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={deleteProduct}
          isLoading={isLoading}
        />
      );
  }
}