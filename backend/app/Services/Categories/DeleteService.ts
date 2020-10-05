import Category from "App/Models/Category";

export default class DeleteService {
  public async run(id: number): Promise<void> {
    try {
      const category: Category = await Category.findOrFail(id)

      await category.delete()
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
