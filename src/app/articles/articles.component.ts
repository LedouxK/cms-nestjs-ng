import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles$: Observable<any[]> | null = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.articles$ = this.httpClient.get<any[]>('http://localhost:3000/articles');
  }

  reloadArticles(deletionSuccess: any){
    console.log('deletion success : ', deletionSuccess);
    this.articles$ = this.httpClient.get<any[]>('http://localhost:3000/articles')
  }
}