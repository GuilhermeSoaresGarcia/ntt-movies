import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ContentComponent } from "./content/content.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',    
    imports: [RouterOutlet, HeaderComponent, ContentComponent, FooterComponent]
})
export class AppComponent {
  title = 'ntt-movies';
 }
