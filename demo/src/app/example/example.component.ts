import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  @Input() title;

  @Input() tsGistId;

  loadedTsGist: string;

  constructor() {
    this.loadedTsGist = "";
  }

  ngOnInit() {
  }

  tabChange(x) {
    this.loadedTsGist = x === 0 ? "" : this.tsGistId;
  }

}
