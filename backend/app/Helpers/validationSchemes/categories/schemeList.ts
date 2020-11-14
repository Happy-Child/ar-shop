import {rules, schema} from "@ioc:Adonis/Core/Validator";

const sortByValues = ['created_at', 'name']

export default {
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
