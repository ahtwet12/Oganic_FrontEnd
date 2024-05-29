import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit, OnDestroy {

  listOrder: any;
  username: any;
  refreshSubscription!: Subscription;

  constructor(private orderService: OrderService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.getListOrder();
    // Fetch order status every 30 seconds
    this.refreshSubscription = interval(30000).subscribe(() => {
      this.getListOrder();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the refresh subscription when component is destroyed
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  getListOrder() {
    this.orderService.getListOrderByUser(this.username).subscribe({
      next: res => {
        this.listOrder = res;
        console.log(this.listOrder);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getOrderStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'p-button-warning';
      case 'Confirmed': return 'p-button-info';
      case 'Delivered': return 'p-button-success';
      case 'Cancelled': return 'p-button-danger';
      default: return 'p-button-secondary';
    }
  }

}
