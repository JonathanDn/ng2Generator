import {Component, OnInit} from '@angular/core';

@Component({
    selector: '<%= name %>',
    templateUrl: ['<%= name %>.html'],
    styleUrls:['<%= name %>.scss']
})
export class <%= nameCamel %>Component implements OnInit{
    constructor() {}

    ngOnInit() {
        
    }
}