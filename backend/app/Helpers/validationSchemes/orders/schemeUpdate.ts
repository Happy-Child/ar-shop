import {rules, schema} from "@ioc:Adonis/Core/Validator";
import EOrderStatuses from "Contracts/enums/orderStatuses";

export default {
  status: schema.enum.optional([
    EOrderStatuses.STATUS_NEW,
    EOrderStatuses.STATUS_AGREED,
    EOrderStatuses.STATUS_PAID,
    EOrderStatuses.STATUS_IN_DELIVERY,
    EOrderStatuses.STATUS_DELIVERED,
  ]),
  products: schema.array.optional().members(
    schema.object().members({
      id: schema.number(),
      quantity: schema.number(),
      name: schema.string(
        {trim: true},
        [
          rules.minLength(2),
          rules.maxLength(60),
        ]
      ),
      price: schema.number([
        rules.range(1, 999999)
      ]),
      image: schema.string.optional(),
    })
  ),
  delivery_address: schema.string.optional(
    {trim: true},
    [
      rules.minLength(2),
      rules.maxLength(200),
    ]
  ),
  comment: schema.string.optional(
    {trim: true},
    [
      rules.minLength(2),
      rules.maxLength(200),
    ]
  ),
}
