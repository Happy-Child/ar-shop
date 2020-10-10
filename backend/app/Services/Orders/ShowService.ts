import Order from "App/Models/Order";
import {E_ORDER_NOT_FOUND} from "App/Helpers/errorTypes";

export default class ShowService {
  public async run(id: number): Promise<Order>
  {
    try {
      const order = Order
        .query()
        .where('id', id)

      order.preload('products', query => {
        query.as('products')
      })

      const [orderResult]: Order[] = await order

      if (!orderResult) {
        throw {
          code: E_ORDER_NOT_FOUND
        }
      }

      return orderResult
    } catch (e) {
      throw e
    }
  }
}
