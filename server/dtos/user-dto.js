export default class UserDto {
  email;
  id;
  isActivated;
  isVictim;
  role;
  name;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.isVictim = model.isVictim;
    this.role = model.role;
    this.name = model.name;
  }
}