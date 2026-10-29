export enum PASSWORD_NAME_FIELD {
  CURRENT = 'currentPassword',
  NEW = 'newPassword',
  CONFIRM = 'confirmPassword',
};

export const PASSWORD_FIELDS = [
  {
    name: PASSWORD_NAME_FIELD.CURRENT,
    label: 'Поточний пароль',
  },
  {
    name: PASSWORD_NAME_FIELD.NEW,
    label: 'Новий пароль',
  },
  {
    name: PASSWORD_NAME_FIELD.CONFIRM,
    label: 'Підтвердження пароля',
  },
];

export const NOTIFICATION_LIST = [
  'Одразу після оплати сеансу',
  'Одразу після перенесення чи скасування сеансу',
  'За 1 годину до початку сеансу',
  'Коли психотерапевт скасував попереднє бронювання',
];
