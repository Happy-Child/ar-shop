import EUserRoles from "Contracts/enums/userRoles";
import EUserSexes from "Contracts/enums/userSexes";

export default interface IUser {
  role?: EUserRoles;
  name: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string;
  sex?: EUserSexes;
  verified?: boolean,
  last_visited?: Date | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
