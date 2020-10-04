import Factory from '@ioc:Adonis/Lucid/Factory'
import Category from "App/Models/Category";

export default Factory
  .define(Category, ({faker}) => {
    faker.setLocale('en')
    return {
      user_id: 1,
      image: null,
      name: faker.commerce.productAdjective(),
    }
  })
  .build()
