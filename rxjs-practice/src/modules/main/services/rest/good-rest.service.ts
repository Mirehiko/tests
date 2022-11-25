import { Injectable } from "@angular/core";
import { GoodRequestDto } from '../../../../app/dto/good-request-dto';
import { GoodResponseDto } from '../../../../app/dto/good-response-dto';
import { MainModule } from '../../main.module';
import { fromFetch } from 'rxjs/fetch';
import { catchError, map, share, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: MainModule })
export class GoodRestService {
  baseUrl: string = 'https://63803ec42f8f56e28e9ec3c7.mockapi.io/api/v1/';

  constructor(
  ) {
  }

  public getList(page: number = 1): Observable<GoodResponseDto[]> {
    let getPage = page ? `page=${page}&` : '';
    return fromFetch(`${this.baseUrl}/film?${getPage}limit=5`).pipe(
      switchMap(response => response.json()),
      share()
    );
  }

  public create(requestDto: GoodRequestDto): Observable<GoodResponseDto> {
    return fromFetch(`${this.baseUrl}/film`, {
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
    return fromFetch(`${this.baseUrl}/film/${id}`, {
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
    return fromFetch(`${this.baseUrl}/film/${id}`).pipe(
      switchMap(response => response.json()),
    );
  }

  public delete(id: number): Observable<any> {
    console.log('del')

    return fromFetch(`${this.baseUrl}/film/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).pipe(
      switchMap(response => response.json()),
      map(data => {
        console.log(data)
        return data;
      }),
      catchError((err) => {
        console.log(err)
        return of ({error: true, message: 'asdasd'})
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
