import { Component } from '@angular/core';
import { ImageService, Image, Rate } from './../../services/image.service';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-container',
  imports: [CommonModule],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.scss'
})
export class CardsContainerComponent {
  images$: Observable<Image[]> = of([]);

  constructor (private imageService: ImageService, private toastr: ToastrService) {
    this.images$ = this.imageService.getImages$();
  }

  rateImage(id: string, rate: Rate) {
    this.imageService.rateImage$(id, rate).subscribe({
      next: () => this.toastr.success('Your rate was counted'),
      error: () => this.toastr.error('Error while rating an image')
    });
  }
}
