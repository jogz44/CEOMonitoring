export class Personnel {
  constructor(data) {
    this.id = data.id || null;
    this.lastName = data.lastName || '';
    this.firstName = data.firstName || '';
    this.middleName = data.middleName || '';
  }
}
