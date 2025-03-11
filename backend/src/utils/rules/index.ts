export enum Role {
  USER = 'user',
  ADM = 'adm'
}

export enum UserRules {
  USER_CREATE = 'user_create',
  USER_READ = 'user_read',
  USER_UPDATE = 'user_update',
  USER_DELETE = 'user_delete',
}

export enum MealsRules {
  MEALS_CREATE = 'meals_create',
  MEALS_READ = 'meals_read',
  MEALS_UPDATE = 'meals_update',
  MEALS_DELETE = 'meals_delete',
}

type Rules = (UserRules | MealsRules)[];

export const rolePermissions: Record<Role, Rules> = {
  [Role.USER]: [
    UserRules.USER_READ,
    UserRules.USER_UPDATE,
    MealsRules.MEALS_CREATE,
    MealsRules.MEALS_DELETE,
    MealsRules.MEALS_READ,
    MealsRules.MEALS_UPDATE

  ],
  [Role.ADM]: [
    UserRules.USER_CREATE,
    UserRules.USER_READ,
    UserRules.USER_UPDATE,
    UserRules.USER_DELETE,
    MealsRules.MEALS_CREATE,
    MealsRules.MEALS_DELETE,
    MealsRules.MEALS_READ,
    MealsRules.MEALS_UPDATE
  ],
}
