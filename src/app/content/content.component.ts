import { Component } from '@angular/core';
import { MovieCardComponent } from "./movie-card/movie-card.component";

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    imports: [MovieCardComponent]
})
export class ContentComponent {

}
