import {AuthContract} from "@ioc:Adonis/Addons/Auth";
import User from "App/Models/User";
import {LucidModel} from "@ioc:Adonis/Lucid/Model";

export default class GetMyService {
  public async run(auth: AuthContract): Promise<InstanceType<LucidModel>[] | []> {
    try {
      const user: User | undefined = auth.use('api').user

      if (user) {
        await user.preload('orders', query => {
          query.as('orders')
        })
      }

      return user?.orders || []
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
