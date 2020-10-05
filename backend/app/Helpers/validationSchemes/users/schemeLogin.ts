import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default {
  email: schema.string(
    {trim: true},
    [
      rules.email()
    ]
  ),
  password: schema.string(
    {trim: true}
  )
}
