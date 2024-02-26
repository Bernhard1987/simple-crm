import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection, addDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  firestore: Firestore = inject(Firestore);
  loading = false;
  dialogOpen = false;

  userList: User[] = [];
  currentUser: User = new User();

  unsubUserList;

  constructor() {
    this.unsubUserList = this.subUserList();
  }

  ngOnDestroy() {
    this.unsubUserList();
  }

  subUserList() {
    return onSnapshot(this.getUsersRef(), (list) => {
      this.userList = [];
      list.forEach(user => {
        this.userList.push(this.setUserObject(user.data(), user.id))
      })
    })
  }

  setUserObject(obj: any, id: string) {
    return {
      id: id || "",
      firstName: obj.firstName || "",
      lastName: obj.lastName || "",
      birthDate: obj.birthDate || "",
      street: obj.street || "",
      zipCode: obj.zipCode || "",
      city: obj.city || "",
      email: obj.email || "",
    }
  }

  getSingleUserData(userId: string) {
    return onSnapshot(this.getSingleDocRef('users', userId), (user: any) => {
      this.currentUser = user.data();
      this.currentUser.id = userId;
    })
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  getCleanJson(user: User): {} {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
      email: user.email,
    }
  }

  async saveUser(user: {}) {
    this.loading = !this.loading;
    await addDoc(this.getUsersRef(), user).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => {
        this.loading = !this.loading;
        this.dialogOpen = false;
      }
    )
  }
}
