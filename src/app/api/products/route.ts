import { NextRequest, NextResponse } from 'next/server';

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  detailedDescription: string;
  features: string[];
}

let products: Product[] = [
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

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const product = products.find(p => p.id === id);
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: product
      });
    }

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requiredFields = ['name', 'price', 'description'];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field '${field}' is required` },
          { status: 400 }
        );
      }
    }

    if (typeof body.price !== 'number' || body.price <= 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: generateId(),
      name: body.name,
      image: body.image || '/default-product.jpg',
      description: body.description,
      price: body.price,
      detailedDescription: body.detailedDescription || body.description,
      features: body.features || []
    };

    products.push(newProduct);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON format' },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (body.price !== undefined) {
      if (typeof body.price !== 'number' || body.price <= 0) {
        return NextResponse.json(
          { error: 'Price must be a positive number' },
          { status: 400 }
        );
      }
    }

    const updatedProduct: Product = {
      ...products[productIndex],
      ...body,
      id 
    };

    products[productIndex] = updatedProduct;

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON format' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
