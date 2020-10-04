import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from "Database/factories/UserFactory";
import EUserRoles from "Contracts/enums/userRoles";

const admins: Array<object> = new Array(3)
  .fill(0)
  .map((_, i) => {
    const index: number = i + 1
    const admin: {role: EUserRoles, name: string, email: string, verified: boolean} = {
      role: EUserRoles.ROLE_ADMIN,
      name: `admin${index}`,
      email: `admin${index}@gmail.com`,
      verified: true,
    }

    if (index === 1) {
      admin.name = 'superadmin'
      admin.name = 'superadmin@gmail.com'
      admin.role = EUserRoles.ROLE_SUPER_ADMIN
    }

    console.log(admin)

    return admin
  })

const managers: Array<object> = new Array(4)
  .fill(0)
  .map((_, index) => ({
    role: EUserRoles.ROLE_MANAGER,
    name: `manager${index + 1}`,
    email: `manager${index + 1}@gmail.com`,
    verified: true,
  }))

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await UserFactory
      .merge([
        ...admins,
        ...managers,
      ])
      .createMany(20)
  }
}
