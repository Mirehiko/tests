import { Injectable } from "@angular/core";
import { GoodRequestDto } from '../../../../app/dto/good-request-dto';
import { GoodResponseDto } from '../../../../app/dto/good-response-dto';
import { MainModule } from '../../main.module';
import { fromFetch } from 'rxjs/fetch';
import { map, share, switchMap } from "rxjs/operators";
import { Observable } from 'rxjs';


@Injectable({ providedIn: MainModule })
export class GoodRestService {
  // baseUrl: string = 'https://jsonplaceholder.typicode.com';
  baseUrl: string = 'https://63803ec42f8f56e28e9ec3c7.mockapi.io/api/v1/';


  constructor(
  ) {
  }

  public getList(): Observable<GoodResponseDto[]> {
    return fromFetch(`${this.baseUrl}/film`).pipe(
      switchMap(response => response.json()),
      share()
    );
  }

  public create(requestDto: GoodRequestDto): Observable<GoodResponseDto> {
    return fromFetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      body: this.stringifyDto(requestDto),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).pipe(
      switchMap(response => response.json()),
    );
  }

  public update(id: number, requestDto: GoodRequestDto): Observable<GoodResponseDto> {
    return fromFetch(`${this.baseUrl}/posts/${id}`, {
      method: 'PUT',
      body: this.stringifyDto(requestDto, id),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).pipe(
      switchMap(response => response.json()),
    );
  }

  public getById(id: number): Observable<GoodResponseDto> {
    return fromFetch(`${this.baseUrl}/posts/${id}`).pipe(
      switchMap(response => response.json()),
    );
  }

  public delete(id: number): Observable<GoodResponseDto> {
    return fromFetch(`${this.baseUrl}/posts/${id}`, {
      method: 'DELETE',
    }).pipe(
      switchMap(response => response.json()),
      map(data => {
        return data;
      })
    );
  }

  private stringifyDto(request: GoodRequestDto, id?: number): string {
    if (id) {
      return JSON.stringify({
        id,
        ...request
      });
    }
    return JSON.stringify(request);
  }
}
