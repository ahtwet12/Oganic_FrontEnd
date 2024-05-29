import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFaceLaughWink, faTag } from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons'
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faReceipt} from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {faRocket} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import {faGear} from '@fortawesome/free-solid-svg-icons'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import { CategoryService } from 'src/app/_service/category.service';
import { ProductService } from 'src/app/_service/product.service';




@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  categories: any[] = [];
  totalCategories: number = 0;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.categoryService.getListCategory().subscribe((data: any[]) => {
      this.categories = data;
      this.totalCategories = data.length;
      //this.quantity = data;
     this.calculateProductQuantities();
    });
  }

  calculateProductQuantities(): void {
    this.categories.forEach(category => {
      // this.productService.getCategoryProductCount().subscribe( => {
      //   category.numberPro = numberPro;
      // });
    });
  }

  viewProducts(categoryId: number): void {
    this.router.navigate(['/product', categoryId, 'product']);
  }
  viewCategory(categoryId: number): void {
    this.router.navigate(['/category', categoryId, 'product']);
  }
}
