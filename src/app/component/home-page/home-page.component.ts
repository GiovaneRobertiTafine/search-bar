import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { DataService } from 'src/app/service/data.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
    public posts: Post[];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.getPosts().subscribe(
            (post) => (this.posts = post),
            (err) => console.log(err),
            () => console.log(this.posts)
        );
    }
}
