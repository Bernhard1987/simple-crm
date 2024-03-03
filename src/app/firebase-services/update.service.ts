import { Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot, collection, addDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.class';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  firestore: Firestore = inject(Firestore);
  loading = false;
  dialogOpen = false;

  customerList: Customer[] = [];
  currentCustomer: Customer = new Customer();

  unsubCustomerList;

  constructor() {
    this.unsubCustomerList = this.subCustomerList();
  }

  ngOnDestroy() {
    this.unsubCustomerList();
  }

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

  getCleanJson(customer: Customer): {} {
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
      await updateDoc(docRef, this.getCleanJson(customer)).catch(
        (err) => { console.error(err) }
      );
    }
  }
}
