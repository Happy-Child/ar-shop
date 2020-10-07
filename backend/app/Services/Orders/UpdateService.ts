import IOrderProducts from "Contracts/interfaces/IOrderProducts";
import EOrderStatuses from "Contracts/enums/orderStatuses";
import Order from "App/Models/Order";
import OrdersProduct from "App/Models/OrdersProduct";

export default class UpdateService {
  private async _updateProducts(orderId: number, products: Array<IOrderProducts>): Promise<void> {
    await OrdersProduct
      .query()
      .where('order_id', orderId)
      .delete()

    const result: {
      image: string | null;
      quantity: number;
      price: number;
      product_id: number;
      name: string;
      order_id: number
    }[] = products.map(product => ({
      order_id: Number(orderId),
      product_id: Number(product.id),
      quantity: Number(product.quantity),
      name: String(product.name),
      image: product?.image ? String(product?.image) : null,
      price: Number(product.price),
    }))

    await OrdersProduct.createMany(result)
  }
  public async run(
    {
      products,
      delivery_address,
      comment,
      status,
    }: {
      products: Array<IOrderProducts> | undefined,
      delivery_address: string | undefined,
      comment: string | undefined,
      status: EOrderStatuses | undefined,
    },
    orderId: number
  ): Promise<void> {
    try {
      const order: Order = await Order.findOrFail(orderId)

      if (status) order.status = status
      if (delivery_address) order.delivery_address = delivery_address
      if (comment) order.comment = comment

      await order.save()

      if (products) {
        await this._updateProducts(orderId, products)
      }
    } catch (e) {
      throw e
    }
  }
}
