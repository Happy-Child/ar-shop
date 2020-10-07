import Category from "App/Models/Category";
import {LucidModel} from "@ioc:Adonis/Lucid/Model";

export default class GetMyService {
  private readonly _columns: string[] = [
    'id',
    'image_small',
    'name',
  ]
  public async run(): Promise<InstanceType<LucidModel>[]> {
    try {
      return await Category.query().select(this._columns)
    } catch (e) {
      throw e
    }
  }
}
