import {rules, schema} from "@ioc:Adonis/Core/Validator";
import EUserRoles from "Contracts/enums/userRoles";

const sortByValues = ['created_at', 'name']

const types = [
  EUserRoles.ROLE_ADMIN,
  EUserRoles.ROLE_MANAGER,
  EUserRoles.ROLE_USER,
]

export default {
  type: schema.enum.optional(types.map(role => String(role))),
  search: schema.string.optional(),
  sort_by: schema.enum.optional(sortByValues),
  sort_desc: schema.boolean.optional(),
  page: schema.number.optional([
    rules.range(1, 999999)
  ]),
  limit: schema.number.optional([
    rules.range(1, 9)
  ]),
}
