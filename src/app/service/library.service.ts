import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Book } from '../model/Book';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient, private notifi: NotificationService) {}
  rootURL = 'http://10.0.137.203:8080/api';

  addUser(user: any) {
    this.http.post(this.rootURL + '/signup', user).subscribe((res: any) => {
      console.log(res);
    });
    this.notifi.showSuccess('Signed up successfully', 'Library.io');
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.rootURL}/admin/addBook`, book);
  }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.rootURL + '/admin/books');
  }
  getUsers() {
    this.http.get(this.rootURL + '/admin/');
  }
  deleteBook(id: number) {
    this.http.delete(`${this.rootURL}/admin/deleteBook/${id}`).subscribe();
  }
  searchBooks(bookName: string): Observable<Book[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('bookName', bookName);
    return this.http.get<Book[]>(`${this.rootURL}/student/searchBooks`, {
      params: httpParams,
    });
  }
  lendBook(userId: number, bookId: number) {
    this.http
      .post(`${this.rootURL}/student/lend-book`, {
        userId: userId,
        bookId: bookId,
      })
      .subscribe();
  }
  getLendBooks(userId: number) {
    return this.http.get(`${this.rootURL}/student/lend-book`, {
      params: {
        userId: userId,
      },
    });
  }
  returnBook(userId: number, bookId: number) {
    this.http
      .delete(`${this.rootURL}/student/return-book`, {
        body: {
          userId: userId,
          bookId: bookId,
        },
      })
      .subscribe();
  }
}
