import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default {
  category_id: schema.number([
    rules.exists({ table: 'categories', column: 'id' })
  ]),
  price: schema.number([
    rules.range(1, 999999)
  ]),
  image: schema.file.optional({
    size: '2mb',
    extnames: ['png', 'jpg', 'jpeg'],
  }),
  name: schema.string(
    {trim: true},
    [
      rules.unique({ table: 'products', column: 'name' }),
      rules.minLength(2),
      rules.maxLength(60),
    ]
  ),
  description_full: schema.string.optional(
    {trim: true},
    [
      rules.minLength(2),
      rules.maxLength(500),
    ]
  ),
  description_small: schema.string.optional(
    {trim: true},
    [
      rules.minLength(2),
      rules.maxLength(40),
    ]
  ),
}
