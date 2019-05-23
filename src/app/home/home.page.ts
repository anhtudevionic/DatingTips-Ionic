import { Component, OnInit } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  
})
export class HomePage implements OnInit {
  listcategories: any;
  urlHome = `https://www.zoosk.com/date-mix/wp-json/wp/v2/`;
  urlcategories= `https://englishwebserve.xyz/wp-json/wp/v2/posts?categories=11`;
  //posts = [];
  posts : any;
  page = 1;
  count = null;
  start: any = 0;
  testADS = true;
  objPost = {
    id : Number ,
    title : String,
    content : String,
    excerpt : String,
    img : String,
  };
  constructor(private wp: WordpressService, private loadingCtrl: LoadingController) { 
    
  }

  ngOnInit() {
    this.wp.getcategories().subscribe(data => this.listcategories = data);
    this.wp.doiURL(this.urlHome);
    this.loadPosts();
    this.wp.admobBN();
  }
  
  async loadPosts() {
    // let loading = await this.loadingCtrl.create({
    //   message: 'Loading Data...'
    // });
    // await loading.present();
 
    this.wp.getPosts().subscribe(res => {
      this.count = this.wp.totalPosts;
      this.posts = res;
      //loading.dismiss();
    });
  }
 
  loadMore(event) {
    this.page++;
 
    this.wp.getPosts(this.page).subscribe(res => {
      this.posts = [...this.posts, ...res];
      event.target.complete();
 
      // Disable infinite loading when maximum reached
      if (this.page == this.wp.pages) {
        event.target.disabled = true;
      }
    });
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  home(){
    this.loadPosts();
  }
  async postsdanhmuc(x){
    let listposts: string;
    listposts =  x['wp:post_type'][0].href;
    console.log("===>"+ listposts);
    

    // let loading = await this.loadingCtrl.create({
    //   message: 'Loading Data...'
    // });
    // await loading.present();
 
    this.wp.getpostsCategories(1, listposts).subscribe(res => {
      this.count = this.wp.totalPosts;
      console.log(this.wp.totalPosts);
      
      this.posts = res;
      console.log(res);
      
      //loading.dismiss();
    });
  }
}
