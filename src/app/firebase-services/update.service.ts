import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection, addDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.class';
import { newUser } from '../models/new-user.class';
import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  firestore: Firestore = inject(Firestore);
  provider = new GoogleAuthProvider();
  auth = getAuth();
  router = new Router();

  loading = false;
  dialogOpen = false;
  loginError = false;

  customerList: Customer[] = [];
  currentCustomer: Customer = new Customer();

  localUser: any;

  unsubCustomerList;

  constructor() {
    this.unsubCustomerList = this.subCustomerList();
    const userString = localStorage.getItem('user');
    this.localUser = userString ? JSON.parse(userString) : '';
    console.log('localuser constructor: ', this.localUser);
  }

  ngOnDestroy() {
    this.unsubCustomerList();
  }

  /**
   * All Customer related functions are set here
   * @returns 
   */

  subCustomerList() {
    return onSnapshot(this.getCustomersRef(), (list) => {
      this.customerList = [];
      list.forEach(customer => {
        this.customerList.push(this.setCustomerObject(customer.data(), customer.id))
      })
    })
  }

  setCustomerObject(obj: any, id: string) {
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

  getSingleCustomerData(customerId: string) {
    return onSnapshot(this.getSingleDocRef('customers', customerId), (customer: any) => {
      this.currentCustomer = customer.data();
      this.currentCustomer.id = customerId;
    })
  }

  getCustomersRef() {
    return collection(this.firestore, 'customers');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  getCleanCustomerJson(customer: Customer): {} {
    return {
      firstName: customer.firstName,
      lastName: customer.lastName,
      birthDate: customer.birthDate,
      street: customer.street,
      zipCode: customer.zipCode,
      city: customer.city,
      email: customer.email,
    }
  }

  async saveCustomer(customer: {}) {
    this.loading = !this.loading;
    await addDoc(this.getCustomersRef(), customer).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => {
        this.loading = !this.loading;
        this.dialogOpen = false;
      }
    )
  }

  async updateCustomer(customer: Customer, customerId: string | null) {
    this.loading = !this.loading;
    if (customerId) {
      let docRef = this.getSingleDocRef('customers', customerId);
      await updateDoc(docRef, this.getCleanCustomerJson(customer)).catch(
        (err) => { console.error(err) }
      );
    }
  }

  /**
   * Firebase Auth related functions
   */

  createNewUser(user: newUser) {
    createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userCredential) => {
        // Signed up 
        this.actionsAfterSuccessfulLogin(userCredential);
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
        this.loginError = true;
      });
  }

  loginUser(user: newUser) {
    signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in 
        this.actionsAfterSuccessfulLogin(userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.loginError = true;
        console.log(error);
      });
  }

  actionsAfterSuccessfulLogin(userCredential: any) {
    const retUser = userCredential.user;
    localStorage.setItem('user', JSON.stringify(retUser));
    this.loginError = false;
    this.router.navigate(['/dashboard']);
  }

  logoutUser() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    }).catch((error) => {
      // An error happened.
    });
  }

}