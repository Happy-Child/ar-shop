import {rules, schema} from "@ioc:Adonis/Core/Validator";

const sortByValues = ['created_at', 'name', 'price']

export default {
  category_id: schema.number.optional(),
  price_min: schema.number.optional([
    rules.range(1, 999999)
  ]),
  price_max: schema.number.optional([
    rules.range(1, 999999)
  ]),
  search: schema.string.optional(),
  sort_by: schema.enum.optional(sortByValues),
  sort_desc: schema.boolean.optional(),
  page: schema.number.optional([
    rules.range(1, 999999)
  ]),
  limit: schema.number.optional([
    rules.range(1, 20)
  ]),
}
