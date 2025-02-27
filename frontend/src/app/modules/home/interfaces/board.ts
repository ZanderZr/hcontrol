import { UserRole } from "../../auth/interfaces/user";

export interface Board {
  idPro: number;
  rolePro: UserRole;
  title: string;
  description: string;
  price: string;
}
