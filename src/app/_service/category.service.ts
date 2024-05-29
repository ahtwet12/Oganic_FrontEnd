import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const CATEGORY_API = "http://localhost:8080/api/category/";
const PRODUCT_API = "http://localhost:8080/api/product/";
const CATEGORY_API_PRODUCT = "http://localhost:8080/api/category/product/count";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  getListCategory():Observable<any>{
    return this.http.get(CATEGORY_API,httpOptions);
  }

  getListCategoryEnabled(){
    return this.http.get(CATEGORY_API + 'enabled',httpOptions);
  }

  createCategory(name: string,quantity: number, date: string){
    return this.http.post(CATEGORY_API + 'create',{name,quantity},httpOptions);
  }

  updateCategory(id: number, name: string,quantity: number, date: string){
    return  this.http.put(CATEGORY_API + 'update/' + id,{name,quantity},httpOptions);
  }

  enableCategory(id: number){
    return this.http.put(CATEGORY_API + 'enable/'+ id,httpOptions);
  }

  deleteCategory(id:number){
    return this.http.delete(CATEGORY_API + 'delete/'+ id,httpOptions);
  }

  getProductCountByCategory(): Observable<any> {
    return this.http.get(CATEGORY_API + 'product-count',httpOptions);
  }

}
