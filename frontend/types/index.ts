// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  basePrice: number;
  discountedPrice?: number;
  isActive: boolean;
  isFeatured: boolean;
  category?: Category;
  brand?: Brand;
  variations: ProductVariation[];
  images: ProductImage[];
}

export interface ProductVariation {
  id: string;
  sku: string;
  name: string;
  priceAdjustment?: number;
  discountedPrice?: number;
  stockQuantity: number;
  isActive: boolean;
  isDefault: boolean;
  attributes: ProductVariationAttribute[];
  images: ProductVariationImage[];
}

export interface ProductVariationAttribute {
  attributeName: string;
  attributeValue: string;
  colorCode?: string;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  altText?: string;
  displayOrder: number;
  isDefault: boolean;
}

export interface ProductVariationImage {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  isDefault: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  parentCategoryId?: string;
  subCategories: Category[];
}

// Brand Types
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  isActive: boolean;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  subTotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingStatus: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  productName: string;
  variationName?: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
