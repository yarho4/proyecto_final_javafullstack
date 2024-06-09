import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Signos } from '../model/signos';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SignosService extends GenericService<Signos>{

  //private url: string = `${environment.HOST}/signos`;
  private signosChange: Subject<Signos[]> = new Subject<Signos[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient){
    super(http, `${environment.HOST}/signos`)
  }

  listPageable(p: number, s: number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  
  ////////////////////////
  setSignosChange(data: Signos[]){
    this.signosChange.next(data);
  }

  getSignosChange(){
    return this.signosChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
