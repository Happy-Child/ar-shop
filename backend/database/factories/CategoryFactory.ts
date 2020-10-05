import Factory from '@ioc:Adonis/Lucid/Factory'
import Category from "App/Models/Category";

export default Factory
  .define(Category, ({faker}) => {
    faker.setLocale('en')
    return {
      user_id: faker.random.number({min: 2, max: 7}),
      image: faker.image.cats(1000, 1000),
      image_small: faker.image.cats(100, 100),
      name: faker.random.words(2),
    }
  })
  .build()
