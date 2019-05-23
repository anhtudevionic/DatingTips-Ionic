import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  //url = `https://englishwebserve.xyz/wp-json/wp/v2/`;
  url : string;
  urlcategories= `https://www.zoosk.com/date-mix/wp-json/wp/v2/categories/`;
  urlcate = `https://englishwebserve.xyz/wp-json/wp/v2/posts?categories=11`;
  totalPosts = null;
  totalPosts2 = null;
  pages: any;
  categories: any;
  testADS = true;
  constructor( private http: HttpClient, private admobFree: AdMobFree ) { }
  getPosts(page = 1): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      params: {
        per_page: '5',
        page: ''+page
      }
    };
 
    return this.http.get<any[]>(`${this.url}posts?_embed`, options).pipe(
      map(resp => {
        this.pages = resp['headers'].get('x-wp-totalpages');
        this.totalPosts = resp['headers'].get('x-wp-total');
 
        let data = resp['body'];
        console.log(data);
        
        for (let post of data) {
          //post.media_url = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
          post.media_url = post['_embedded']['wp:featuredmedia'][0].source_url;
          console.log(post.media_url);
          
        }
        return data;
      })
    )
  }
 
  getPostContent(id) {
    return this.http.get(`${this.url}posts/${id}?_embed`).pipe(
      map(post => {
        //post['media_url'] = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
        post['media_url'] = post['_embedded']['wp:featuredmedia'][0].source_url;
        return post;
      })
    )
  }
  admobBN() {
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-2994055434333003/1682659984',
      isTesting: this.testADS,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare()
      .then(() => {
      })
      .catch(e => console.log(e));
  }
  admobFULL() {
    const interConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-2994055434333003/7702586507',
      isTesting: this.testADS,
      autoShow: true,
    }
    this.admobFree.interstitial.config(interConfig);
    this.admobFree.interstitial.prepare()
      .then(() => {
      })
      .catch(e => console.log(e));
  }
  admobVIDEO() {
    const videoConfig: AdMobFreeRewardVideoConfig = {
      id: 'ca-app-pub-2994055434333003/9445599930',
      isTesting: this.testADS,
      autoShow: true,
    }
    this.admobFree.rewardVideo.config(videoConfig);
    this.admobFree.rewardVideo.prepare()
      .then(() => {
      })
      .catch(e => console.log(e));
  }
  getcategories() {
    let data: Observable<any>;
    data = this.http.get(this.urlcategories);
    return data;
  }
  doiURL(link: string){
    this.url = link;
  }
  getIMG(link: string){
    let data: Observable<any>;
    data = this.http.get(link);
    return data;
  }
  getpostsCategories(page = 1, url: string): Observable<any[]>{
    let options = {
      observe: "response" as 'body',
      params: {
        per_page: '5',
        page: ''+page
      }
    };
 
    return this.http.get<any[]>(url, options).pipe(
      map(resp => {
        this.pages = resp['headers'].get('x-wp-totalpages');
        this.totalPosts = resp['headers'].get('x-wp-total');

        let data = resp['body'];
        console.log(data);
        
        for (let post of data) {
          //post.media_url = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
          //post.media_url = post['_link']['wp:featuredmedia'][0].source_url;
          let img;
          this.getIMG(post['_links']['wp:featuredmedia'][0].href).subscribe(data => img = data.source_url);
          post.media_url = img;
          console.log(img);
        }
        console.log("data ==> "+data);
        
        return data;
      })
    )
  }
}
