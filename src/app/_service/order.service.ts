import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../_class/order';
import { OrderDetail } from '../_class/order-detail';

const ORDER_API = "http://localhost:8080/api/order/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }


  getListOrder():Observable<any>{
    return this.http.get(ORDER_API,httpOptions);
  }


  getListOrderByUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(ORDER_API + 'user',{params: params});

  }

  placeOrder(firstname: string,lastname:string,country:string,address: string,town: string,state:string,postCode: string,phone:string,email:string,note:string,orderDetails: OrderDetail[],username: string):Observable<any>{
    return this.http.post(ORDER_API +'create',{firstname,lastname,country,address,town,state,postCode,phone,email,note,orderDetails,username},httpOptions);
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(ORDER_API +  'status/' + id , { status }, httpOptions);
  }


  updateOrder(id: number, firstname: string,lastname : string,address: string,
    phone: string,email: string,totalPrice: string,expecteddeliverydate: string){
    return  this.http.put(ORDER_API + 'update/' + id,{firstname,lastname ,address,phone,email,totalPrice,expecteddeliverydate},httpOptions);
  }

  deleteOrder(id:number){
    return this.http.delete(ORDER_API + 'delete/'+ id,httpOptions);
  }

}
