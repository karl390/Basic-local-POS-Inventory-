export default function LowStockAlert({ product }) {
    if (product.stock > product.lowStock) return null;
  
    return (
      <div className="bg-red-100 text-red-600 border border-red-300 px-2 py-1 rounded mb-2">
        ⚠ Low Stock: {product.stock} left
      </div>
    );
  }
  