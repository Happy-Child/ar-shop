import Order from "App/Models/Order";
import OrdersProduct from "App/Models/OrdersProduct";
import IOrderProducts from "Contracts/interfaces/IOrderProducts";

export default class CreateService {
  private async _saveProducts(orderId: number, products: Array<IOrderProducts>): Promise<void> {
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
      user_id,
      name,
      phone,
      email,
      comment,
      status,
      delivery_address,
    }: Order,
    products: Array<IOrderProducts>
  ): Promise<void> {
    try {
      const order: Order = new Order()

      order.user_id = user_id
      order.name = name
      order.email = email
      order.status = status
      order.delivery_address = delivery_address
      if (phone) order.phone = phone
      if (comment) order.comment = comment

      const savedOrder: Order = await order.save()

      await this._saveProducts(savedOrder.id, products)
    } catch (e) {
      throw e
    }
  }
}
