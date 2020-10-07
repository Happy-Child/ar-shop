import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default {
  products: schema.array().members(
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
  delivery_address: schema.string(
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
