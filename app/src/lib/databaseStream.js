import { database } from './firebase';

export default class databaseStream {
  constructor(root, operation) {
    this.operation = operation;
    this.ref = database.ref(root);
    this.subscription = null;
  }

  child(path) {
    this.ref = this.ref.child(path);

    return this;
  }

  orderByChild(path) {
    this.ref = this.ref.orderByChild(path);

    return this;
  }

  equalTo(value) {
    this.ref = this.ref.equalTo(value);

    return this;
  }

  subscribe(observer) {
    this.subscription = this.ref.on(this.operation,
      snapshot => observer.next(snapshot),
      error => observer.error(error)
    );

    return { unsubscribe: this.unsubscribe.bind(this) };
  }

  unsubscribe() {
    this.ref.off(this.operation);
    this.ref = null;
  }
}
