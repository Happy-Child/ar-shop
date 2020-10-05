import {rules, schema} from "@ioc:Adonis/Core/Validator";
import {regVPassword} from "App/Helpers/regV";
import EUserSexes from "Contracts/enums/userSexes";

export default {
  name: schema.string.optional(
    {trim: true},
    [
      rules.minLength(2),
      rules.maxLength(40),
    ]
  ),
  phone: schema.string.optional(
    {},
    [
      rules.mobile()
    ]
  ),
  avatar: schema.file.optional({
    size: '2mb',
    extnames: ['png', 'jpg', 'jpeg'],
  }),
  email: schema.string.optional(
    {trim: true},
    [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]
  ),
  password: schema.string.optional(
    {trim: true},
    [
      rules.confirmed(),
      rules.regex(regVPassword)
    ]
  ),
  sex: schema.enum.optional(Object.keys(EUserSexes)),
}
