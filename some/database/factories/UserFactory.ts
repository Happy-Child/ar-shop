import Factory from '@ioc:Adonis/Lucid/Factory'
import User from "App/Models/User";
import EUserRoles from "Contracts/enums/userRoles";
import EUserSexes from "Contracts/enums/userSexes";

export default Factory
  .define(User, ({faker}) => {
    faker.setLocale('en')
    return {
      role: EUserRoles.ROLE_USER,
      avatar: faker.image.avatar(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(2),
      password: 'secret',
      sex: EUserSexes.SEX_MALE,
      verified: faker.random.boolean(),
    }
  })
  .build()
