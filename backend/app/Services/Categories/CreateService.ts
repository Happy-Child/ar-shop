import Category from "App/Models/Category";

export default class CreateService {
  public async run(
    {user_id, image, name}: Category,
  ): Promise<void> {
    try {
      const category: Category = new Category()

      category.user_id = user_id
      category.name = name
      if (image) {}

      await category.save()
    } catch (e) {
      throw e
    }
  }
}
