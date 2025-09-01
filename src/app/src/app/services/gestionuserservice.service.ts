import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../envirenement';

export interface User{
    id:number;
    nom:string;
    prenom:string;
    keyckoakid:string;
    matricule:string;
    email:string;
    phone:string;
    role:Role;
}

export enum Role{
  RH = 'RH',
  MANAGER = 'MANAGER',
  EMPLOYE = 'EMPLOYE'
}

@Injectable({
  providedIn: 'root'
})
export class GestionuserserviceService {

  apiusers= environment.apiUrl+'/users';

  constructor(private http:HttpClient) { }

  createUser(user:User):any{
    return this.http.post<User>(this.apiusers,user);
  }


  updateUser(id:number,user:User):any{
    return this.http.put<User>(`${this.apiusers}/${id}`,user);
  }

  deleteUser(id:number):any{
    return this.http.delete(`${this.apiusers}/${id}`);
  }

  getUsers(page:number,size:number):any{
   // const token = sessionStorage.getItem('access_token');
   // console.log("Token dans le service user: ",token);
    //const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.apiusers}?page=${page}&size=${size}`);
  }

}
