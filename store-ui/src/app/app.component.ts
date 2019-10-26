import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'challenge-store';

  constructor(private router: Router) {}

  showNavbar() {
    return (
      this.router.url === '/' ||
      this.router.url === '/cart' ||
      this.router.url === '/cart/purchase'
    );
  }
}
