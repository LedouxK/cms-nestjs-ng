import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/admin/article.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
  styleUrls: ['./article-summary.component.css']
})
export class ArticleSummaryComponent implements OnInit {
  isWaitingForServerResponse = false;
  error = null;
  @Output() deleteSuccess = new EventEmitter<boolean>();
  @Input()
  article!: Article;
  isInEditMode = false;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  }

  delete(article: Article) {
    this.isWaitingForServerResponse = true;
    this.articleService
      .deleteArticle(article)
      .pipe(
        catchError(this.handleError)
      ).subscribe(
        data => {
          // just to emulate network latence
          setTimeout(() => {
            this.isWaitingForServerResponse = false;
            this.handleSuccess(data);
          }, 2000);
        },
        err => {
          this.isWaitingForServerResponse = false;
          this.handleError(err);
        }
      );
  }
  

  handleError(err: null): any {
    this.error = err;
    return this.error; // Retourne le contenu de l'erreur
  }

  handleSuccess(data: any) {
    console.log('success!!', data);
    this.deleteSuccess.emit(true);
  }

  toggleReadMode() {
    this.isInEditMode = !this.isInEditMode;
  }
  

}