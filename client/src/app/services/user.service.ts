import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { UserDetails } from '../model/userDetails'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersList: UserDetails[] = [];
  url = 'http://localhost:3000/api/userInfo/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  userFormDetails = this.formBuilder.group({
    _id: [''],
    name: [''],
    email: ['',[Validators.required,Validators.email]],
    address: [''],
    class: [''],
    phonenumber: ['',[ Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    user_file:['',Validators.required]
  })

  createUser(formData) {
    return this.http.post(this.url, formData).pipe(catchError(this.errorHandler))
  }


  deleteUser(id: string) {
    return this.http.delete(this.url + id).pipe(catchError(this.errorHandler))
  }

  updateUser(formData) {
    return this.http.put(this.url + this.userFormDetails.get('_id')?.value, formData).pipe(catchError(this.errorHandler))
  }

  getAllUsers() {
    return this.http.get(this.url).pipe(catchError(this.errorHandler)).subscribe(data => {
      this.usersList = data as UserDetails[];
    })
  }
  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
