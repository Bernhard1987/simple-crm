import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  onSnapshot,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer.class';
import { NewUser } from '../../models/new-user.class';
import { UserData } from '../../models/userdata.class';
import { Note } from '../../models/note.class';
import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  firestore: Firestore = inject(Firestore);
  provider = new GoogleAuthProvider();
  auth: any;
  currentUserUid = '';
  currentUserData = new UserData();
  currentUserEMail = '';
  router = new Router();

  loading = false;
  dialogOpen = false;
  loginError = false;

  customerList: Customer[] = [];
  currentCustomer: Customer = new Customer();
  customerId: string = '';
  currentCustomerNotesCollection: Note[] = [];

  userString = localStorage.getItem('user');
  localUser: any = this.userString ? JSON.parse(this.userString) : '';

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

  setNoteObject(obj: any) {
    return {
      title: obj.title || "",
      content: obj.content || "",
      createdByUid: obj.createdByUid || "",
      creationTime: obj.creationTime || 0
    }
  }

  setUserDataObject() {
    return {
      firstName: "",
      lastName: ""
    }
  }

  getSingleCustomerData(customerId: string) {
    console.log('getting info for ', customerId);
    return onSnapshot(this.getSingleDocRef('customers', customerId), (customer: any) => {
      this.currentCustomer = customer.data();
      this.currentCustomer.id = customerId;
    })
  }

  getCurrentCustomerNotes(currentCustomerId: string) {
    console.log("getCurrentCustomerNotes ", currentCustomerId);
    let ref = this.getCustomerNotesRef(currentCustomerId);
    let q = query(ref, orderBy("creationTime", "desc"), limit(100));
    return onSnapshot(q, (noteList) => {
      this.currentCustomerNotesCollection = [];
      noteList.forEach(note => {
        this.currentCustomerNotesCollection.push(this.setNoteObject(note.data()));
      })
      console.log(this.currentCustomerNotesCollection);
    })
  }

  getCurrentUserData() {
    if (!this.currentUserUid) {
      console.error('error getting currentUserData');
      return () => {
        this.currentUserData = this.setUserDataObject();
      };
    }
    return onSnapshot(this.getSingleDocRef('userdata', this.currentUserUid), (userData: any) => {
      this.currentUserData = userData.data();
    })
  }

  getSpecificUserData(specificUserUid: string) {
    if (specificUserUid) {
      return onSnapshot(this.getSingleDocRef('userdata', specificUserUid), (userData: any) => {
        this.currentUserData = userData.data();
      })
    } else {
      console.error('error getting name from User');
      return this.setUserDataObject(); //returns empty Data object
    }
  }

  getCustomersRef() {
    return collection(this.firestore, 'customers');
  }

  getCustomerNotesRef(currentCustomerId: string) {
    return collection(this.firestore, `customers/${currentCustomerId}/notes`);
  }

  getUserDataRef() {
    return collection(this.firestore, 'userdata');
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

  getCleanUserDataJson(userData: UserData): {} {
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
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

  async saveNoteToCustomer(customerUid: string, note: {}) {
    this.loading = !this.loading;
    await addDoc(this.getCustomerNotesRef(customerUid), note).catch(
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

  async initUser() {
    this.auth = getAuth();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUserUid = user.uid;
        if (user.email) {
          this.currentUserEMail = user.email;
        }
        this.getCurrentUserData();
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  createNewUser(user: NewUser) {
    createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userCredential) => {
        // Signed up 
        this.actionsAfterSuccessfulLogin(userCredential);
        this.createUserData(userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        this.loginError = true;
      });
  }

  async createUserData(userCredential: any) {
    const retUser = userCredential.user;
    await setDoc(doc(this.firestore, 'userdata', retUser.uid), this.setUserDataObject()).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => {
        console.log('userData set successful');
      }
    )
  }

  async updateUserData(userData: UserData) {
    if (this.currentUserUid) {
      await updateDoc(doc(this.firestore, 'userdata', this.currentUserUid), this.getCleanUserDataJson(userData)).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          console.log('userData updated successful');
        }
      )
    }
  }


  loginUser(user: NewUser) {
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