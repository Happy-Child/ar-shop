import Category from "App/Models/Category";

export default class UpdateService {
  public async run(
    {image, name}: Category,
    id: number
  ): Promise<void> {
    try {
      const category: Category = await Category.findOrFail(id)

      if (name) category.name = name
      if (image) {}

      await category.save()
    } catch (e) {
      throw e
    }
  }
}
