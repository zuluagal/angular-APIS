import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];

  showProductDetail = false;

  productChosen: Product ={
    id: '',
    price: 0,
    images: [],
    title: '',
    //slug: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  //Mostrar detalle producto
  onShowDetail(id: string) {
    this.productsService.getOneProduct(id)
    .subscribe(data =>{
      console.log(data); 
      this.toggleProductDetail();
      this.productChosen = data;
    });

  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'ZuluaXXX',
      description: 'xxxxx',
      //slug: '1122-1',
      images: ['https://imgur.com/cHddUCu'],
      price: 10000,
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe(data =>{
      console.log('create', data);
      this.products.unshift(data);
    });
  }

}
