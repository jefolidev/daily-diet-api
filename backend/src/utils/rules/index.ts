export enum Role {
  USER = 'user',
  ADM = 'adm',
}

export enum AccountRules {
  ACCOUNT_CREATE = 'account_create',
  ACCOUNT_READ_OTHERS = 'account_read_others',
  ACCOUNT_UPDATE = 'account_update',
  ACCOUNT_DELETE = 'account_delete',
}

export enum UserRules {
  USER_CREATE = 'user_create',
  USER_READ_OWNSELF = 'user_read_ownself',
  USER_READ_OTHERS = 'user_read_others',
  USER_UPDATE = 'user_update',
  USER_DELETE = 'user_delete',
}

export enum MealsRules {
  MEALS_CREATE = 'meals_create',
  MEALS_READ_OWNSELF = 'meals_read_ownself',
  MEALS_READ_OTHERS = 'meals_read_others',
  MEALS_UPDATE = 'meals_update',
  MEALS_DELETE = 'meals_delete',
}

export type Rules = UserRules | MealsRules | AccountRules

export const rolePermissions: Record<Role, Rules[]> = {
  [Role.USER]: [
    // ? Permissões de Usuários

    UserRules.USER_READ_OWNSELF,
    UserRules.USER_UPDATE,

    // ? Permissões de Refeições

    MealsRules.MEALS_CREATE,
    MealsRules.MEALS_DELETE,
    MealsRules.MEALS_READ_OWNSELF,
    MealsRules.MEALS_UPDATE,

    // ? Permissões de Contas

    AccountRules.ACCOUNT_CREATE,
  ],
  [Role.ADM]: [
    // ? Permissões de Usuários

    UserRules.USER_CREATE,
    UserRules.USER_READ_OTHERS,
    UserRules.USER_READ_OWNSELF,
    UserRules.USER_UPDATE,
    UserRules.USER_DELETE,

    // ? Permissões de Refeições

    MealsRules.MEALS_CREATE,
    MealsRules.MEALS_DELETE,
    MealsRules.MEALS_READ_OWNSELF,
    MealsRules.MEALS_READ_OTHERS,
    MealsRules.MEALS_UPDATE,

    // ? Permissões de Contas

    AccountRules.ACCOUNT_CREATE,
    AccountRules.ACCOUNT_READ_OTHERS,
    AccountRules.ACCOUNT_UPDATE,
    AccountRules.ACCOUNT_DELETE,
  ],
}
