import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [MessageService]
})
export class OrderComponent implements OnInit {

  listOrder : any;

  statuses: { label: string, value: string }[] = [];

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  orderForm : any ={
    firstname: null,
    lastname : null,
    address: null,
    phone: null,
    email: null,
    totalPrice: null,
    orderdate: null,
    expecteddeliverydate: null,
    actualdeliverydate: null,
    cancelleddate: null
  }


  constructor(private orderService: OrderService){
    this.statuses = [
      {label: 'Pending', value: 'Pending'}, //dang chờ xử lý
      {label: 'Confirmed', value: 'Confirmed'}, //đã xác nhận
      {label: 'Shipped', value: 'Shipped'}, //đang giao
      {label: 'Delivered', value: 'Delivered'}, //đã giao hàng
      {label: 'Cancelled', value: 'Cancelled'} //đã hủy
    ];
  }

  ngOnInit(): void {
    this.getListOrder();
  }


  getListOrder(){
    this.orderService.getListOrder().subscribe({
      next: res=>{
        this.listOrder = res;
        console.log(this.listOrder);
      },error: err =>{
        console.log(err);
      }
    })
  }

  onUpdateForm(id: number, firstname: string,lastname : string,address: string,
    phone: string,email: string,totalPrice: string,expecteddeliverydate: string
  ){
    this.onUpdate = true;
    this.displayForm =true;
    this.orderForm.id = id;
    this.orderForm.firstname = firstname;
    this.orderForm.lastname = lastname;
    this.orderForm.address = address;
    this.orderForm.phone = phone;
    this.orderForm.email = email;
    this.orderForm.totalPrice = totalPrice;
    this.orderForm.expecteddeliverydate = new Date(expecteddeliverydate).toLocaleString('en-GB', { hour12: false });
}

onDelete(id: number, firstname: string,lastname : string,address: string,
  phone: string,email: string,totalPrice: string
){
  this.deleteForm = true;
  this.orderForm.id = id;
  this.orderForm.firstname = firstname;
    this.orderForm.lastname = lastname;
    this.orderForm.address = address;
    this.orderForm.phone = phone;
    this.orderForm.email = email;
    this.orderForm.totalPrice = totalPrice;
}

updateOrder(){
  const {id, firstname,lastname ,address,phone,email,totalPrice,expecteddeliverydate} = this.orderForm;
  this.orderService.updateOrder(id, firstname,lastname ,address,phone,email,totalPrice,expecteddeliverydate).subscribe({
    next: res =>{
      this.getListOrder();
      console.log("Cập nhật danh mục thành công!");
      this.displayForm = false;
    },error: err =>{
      console.log(err.message);
    }
  })
}

deleteOrder(){
  const {id} = this.orderForm;
  this.orderService.deleteOrder(id).subscribe({
    next: res =>{
      this.getListOrder();
      console.log("Xóa danh mục thành công!!");
      this.deleteForm = false;
    },error: err=>{
      console.log(err.message);
    }
  })
}

  updateOrderStatus(order: any, status?: string) {
    if (status) {
      order.status = status;
    }
    this.orderService.updateOrderStatus(order.id, order.status).subscribe({
      next: res => {
        console.log('Order status updated successfully');
      },
      error: err => {
        console.log('Error updating order status', err);
      }
    });
  }



}
