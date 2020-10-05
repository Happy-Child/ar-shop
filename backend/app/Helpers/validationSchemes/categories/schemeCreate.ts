import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default {
  image: schema.file.optional({
    size: '2mb',
    extnames: ['png', 'jpg', 'jpeg'],
  }),
  name: schema.string(
    {trim: true},
    [
      rules.unique({ table: 'categories', column: 'name' }),
      rules.minLength(2),
      rules.maxLength(60),
    ]
  ),
}
