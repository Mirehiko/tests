import { Injectable } from "@angular/core";
import { GoodRequestDto } from '../../../../app/dto/good-request-dto';
import { GoodResponseDto } from '../../../../app/dto/good-response-dto';
import { MainModule } from '../../main.module';
import { fromFetch } from 'rxjs/fetch';
import { map, mergeMap, share, switchMap } from "rxjs/operators";
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: MainModule })
export class GoodRestService {
  baseUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(
  ) {
  }

  public getList(): Observable<GoodResponseDto[]> {
    return fromFetch(`${this.baseUrl}/posts?userId=1`).pipe(
      switchMap(response => response.json()),
      map(data => {
        return data.map((item: any) => {
          return {id: item.id, name: item.title, description: item.body};
        });
      }),
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
      map(data => {
        return {id: data.id, name: data.title, description: data.body};
      })
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
      map(data => {
        return {id: data.id, name: data.title, description: data.body};
      })
    );
  }

  public getById(id: number): Observable<GoodResponseDto> {
    return fromFetch(`${this.baseUrl}/posts/${id}`).pipe(
      switchMap(response => response.json()),
      map(data => {
        return {id: data.id, name: data.title, description: data.body};
      })
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
        title: request.name,
        body: request.description,
        userId: 1,
      });
    }
    return JSON.stringify({
      title: request.name,
      body: request.description,
      userId: 1,
    });
  }
}
