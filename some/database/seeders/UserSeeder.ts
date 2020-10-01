import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from "Database/factories/UserFactory";
import EUserRoles from "Contracts/enums/userRoles";

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await UserFactory
      .merge([
        {
          role: EUserRoles.ROLE_SUPER_ADMIN,
          name: 'superadmin',
          email: 'superadmin@gmail.com',
          password: 'superadmin',
          verified: true,
        }
      ])
      .createMany(10)
  }
}
