export class UserDto {
  name: string;
  email: string;
  leavesAllowed: number;
  roles: string[];
  defaultPassword: boolean;
  isActive: boolean;
}
