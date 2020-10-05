import Product from "App/Models/Product";

export default class CreateService {
  public async run(
    {
      user_id,
      category_id,
      price,
      image,
      name,
      description_full,
      description_small,
    }: Product,
  ): Promise<void> {
    try {
      const product: Product = new Product()

      product.user_id = user_id
      product.category_id = category_id
      product.name = name
      product.price = price
      if (image) {}
      if (description_full) product.description_full = description_full
      if (description_small) product.description_small = description_small

      await product.save()
    } catch (e) {
      throw e
    }
  }
}
