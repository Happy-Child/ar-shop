import Order from "App/Models/Order";
import OrdersProduct from "App/Models/OrdersProduct";

export default class DeleteService {
  public async run(id: number): Promise<void> {
    try {
      const order: Order = await Order.findOrFail(id)

      await Promise.all([
        OrdersProduct
          .query()
          .where('order_id', order.id)
          .delete(),
        order.delete()
      ])
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
