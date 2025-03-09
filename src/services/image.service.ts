import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, of, tap } from "rxjs";

export type Rate = 'like' | 'dislike';

export interface Image {
    id: string;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(private http: HttpClient, private toastr: ToastrService) {}

    getImages$(): Observable<Image[]> {
        return this.http.get<Image[]>('https://api.mademyday.ai/Mock/getimages.php').pipe(
            tap(() => this.toastr.success('Images succesfully loaded')),
            catchError(() => {
                this.toastr.error('Error during getting images')
                return of([]);
            })
    );
    }

    rateImage$(id: string, rate: Rate): Observable<void> {
        return this.http.post<void>('https://api.mademyday.ai/Mock/rateimages.php', {
            body: JSON.stringify({ id, rate })
        });
    }
}
