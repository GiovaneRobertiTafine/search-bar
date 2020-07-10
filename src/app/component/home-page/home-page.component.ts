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

    // Verificando a nova lista dos selecioanados para destacar
    onSelectedFilter(event) {
        console.log(event);
        console.log(this.dataService.searchOption);

        this.posts.map((post) => {
            var res = this.dataService.searchOption.filter((search) => search.id === post.id);
            var index = 0;
            if (res.length > 0) {
                index = this.posts.findIndex((post) => post.id === res[0].id);
                this.posts[index] = { ...this.posts[index], isActive: true };
            } else {
                index = this.posts.findIndex((posts) => posts.id === post.id);
                this.posts[index] = { ...this.posts[index], isActive: false };
            }
        });
    }
}
