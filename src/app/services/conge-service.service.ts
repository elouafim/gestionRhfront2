import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../src/app/envirenement';

export interface CongeDTO {
  id: number;
  dateDebut: string;
  dateFin: string;
  status: string;
  userId: number;
}

export interface CongeCreateDTO {
  dateDebut: string;
  dateFin: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CongeServiceService {

  private apiUrl = environment.apiUrl+'/conges';

  constructor(private http: HttpClient) {}

 
  createConge(dto: CongeCreateDTO): Observable<CongeDTO> {
    return this.http.post<CongeDTO>(this.apiUrl, dto);
  }


  updateConge(id: number, dto: CongeDTO): Observable<CongeDTO> {
    return this.http.put<CongeDTO>(`${this.apiUrl}/${id}`, dto);
  }

  updateStatusConge(id: number, status: string): any {
    return this.http.post<CongeDTO>(`${this.apiUrl}/${id}/status`,status);
  }


  deleteConge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getAllConges(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getCongesByEmploye(email: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employe/${email}?page=${page}&size=${size}`);
  }
}
