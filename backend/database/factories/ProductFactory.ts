import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from "App/Models/Product";

export default Factory
  .define(Product, ({faker}) => {
    faker.setLocale('en')
    return {
      category_id: faker.random.number({min: 1, max: 10}),
      user_id: faker.random.number({min: 2, max: 7}),
      image: faker.image.food(1000, 1000),
      image_small: faker.image.food(100, 100),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price(10, 2500)),
      description_small: faker.lorem.words(10),
      description_full: faker.lorem.words(faker.random.number({ min: 20, max: 50 })),
    }
  })
  .build()
