import Product from "App/Models/Product";

export default class DeleteService {
  public async run(id: number): Promise<void> {
    try {
      const product: Product = await Product.findOrFail(id)

      await product.delete()
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
