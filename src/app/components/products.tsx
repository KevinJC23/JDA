'use client';

import { Card, CardContent, CardHeader, CardImage } from "../components/ui/card";
import { useRouter, useParams } from "next/navigation";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
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

const products: Product[] = [
  {
    id: "ua-gray",
    name: "Under Armour 12 (Gray)",
    image: "/under-armour-12.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iusto enim dolorum.",
    price: 129.99,
    detailedDescription: "The Under Armour 12 in Gray combines style and performance with advanced moisture-wicking technology and superior comfort for all-day wear.",
    features: [
      "Moisture-wicking fabric",
      "Anti-odor technology",
      "Lightweight construction",
      "Durable design"
    ],
  },
  {
    id: "ua-white",
    name: "Under Armour 12 (White)",
    image: "/under-armour-12-02.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iusto enim dolorum.",
    price: 129.99,
    detailedDescription: "The classic White Under Armour 12 offers timeless style with cutting-edge athletic performance technology.",
    features: [
      "Breathable mesh panels",
      "Reflective details",
      "Ergonomic fit",
      "Stain-resistant coating"
    ],
  },
  {
    id: "ua-black",
    name: "Under Armour 12 (Black)",
    image: "/under-armour-12-03.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iusto enim dolorum.",
    price: 139.99,
    detailedDescription: "The sleek Black Under Armour 12 delivers premium performance with a bold, versatile design perfect for any activity.",
    features: [
      "Premium fabric blend",
      "Enhanced durability",
      "Temperature regulation",
      "Professional appearance"
    ],
  }
];

const ProductDetailView = ({ product, onBack }: { product: Product; onBack: () => void }) => {
  return (
    <div className="min-h-screen from-zinc-700 flex items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-4xl w-full">
        <div className="mb-8 text-center">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>

        <Card className="shadow-2xl border-0 bg-white dark:bg-zinc-800">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-sm rounded-lg shadow-lg"
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
                {product.detailedDescription}
              </p>

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

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" >
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

const ProductsListView = ({ onProductClick }: { onProductClick: (productId: string) => void }) => {
  return (
    <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Buy to cover your needs
          </h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit
            Ut facilis autem molestias odio blanditiis. 
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group shadow-zinc-950/5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              onClick={() => onProductClick(product.id)}
            >
              <CardHeader className="pb-3">
                <CardImage 
                  src={product.image} 
                  alt={product.name}
                  aspectRatio="square"
                  className="mx-auto size-36"
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
      </div>
    </section>
  );
};

export default function Products() {
  const router = useRouter();
  const params = useParams();
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'not-found'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
  }, []);

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

  switch (currentView) {
    case 'detail':
      return selectedProduct ? (
        <ProductDetailView 
          product={selectedProduct} 
          onBack={handleBackToProducts} 
        />
      ) : null;
    
    case 'not-found':
      return <ProductNotFound onBack={handleBackToProducts} />;
    
    default:
      return <ProductsListView onProductClick={handleProductClick} />;
  }
}