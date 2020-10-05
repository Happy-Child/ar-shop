import Product from "App/Models/Product";

export default class UpdateService {
  public async run(
    {
      category_id,
      price,
      image,
      name,
      description_full,
      description_small,
    }: Product,
    id: number
  ): Promise<void> {
    try {
      const product: Product = await Product.findOrFail(id)

      if (category_id) product.category_id = category_id
      if (price) product.price = price
      if (image) {}
      if (name) product.name = name
      if (description_full) product.description_full = description_full
      if (description_small) product.description_small = description_small

      await product.save()
    } catch (e) {
      throw e
    }
  }
}
