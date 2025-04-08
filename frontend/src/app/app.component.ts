import { Component, OnInit } from '@angular/core';
import { HelloService } from './hello.service';

@Component({
  selector: 'app-root',
  template: `<h1>{{ message }}</h1>`,
})
export class AppComponent implements OnInit {
  message = '';

  constructor(private helloService: HelloService) {}

  ngOnInit() {
    // Check if helloService is defined
    if (this.helloService) {
      this.helloService.getMessage().subscribe((res) => {
        this.message = res.message;
      });
    } else {
      console.error('HelloService is undefined');
    }
  }
}
