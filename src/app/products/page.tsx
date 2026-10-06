import { ProductManager } from '@/components/product-manager';
import { productRepository } from '@/lib/data/repositories/productRepository';

export default async function ProductsPage() {
  const products = await productRepository.getAll();

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Catalog</div>
          <h2>Product management</h2>
        </div>
      </div>

      <ProductManager initialProducts={products} />
    </>
  );
}
