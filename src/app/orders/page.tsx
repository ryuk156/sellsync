import { OrderManager } from '@/components/order-manager';
import { orderRepository } from '@/lib/data/repositories/orderRepository';

export default async function OrdersPage() {
  const orders = await orderRepository.getAll();

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Orders</div>
          <h2>Order operations</h2>
        </div>
      </div>

      <OrderManager initialOrders={orders} />
    </>
  );
}
