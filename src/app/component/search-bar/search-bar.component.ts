import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/model/post';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
    myControl = new FormControl();
    allPosts: Post[];
    autoCompleteList: any[];

    filtermyControl: Observable<string[]>;

    @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef;
    @Output() onSelectedOption = new EventEmitter();

    constructor(private dataService: DataService) {}

    ngOnInit() {
        // get all the post
        this.dataService.getPosts().subscribe((posts) => {
            this.allPosts = posts;
            console.log(this.allPosts);
        });

        this.filtermyControl = this.myControl.valueChanges;

        this.filtermyControl.subscribe((userInput) => {
            if (this.allPosts) {
                if (userInput && userInput.length > 3) return this.autoCompleteExpenseList(userInput);
                this.autoCompleteList = [];
            } else {
                console.log('Aguarde um momento');
            }
        });
    }

    // Verificando o que foi digitado com a lista
    // E retornando o que ainda nao foi add
    private autoCompleteExpenseList(input) {
        var result = this.allPosts.filter((s) => s.title.toLowerCase().indexOf(input.toLowerCase()) != -1);
        var searchRes = [];

        // if (this.dataService.searchOption.length !== 0) {
        //     for (let res of result) {
        //         var search = this.dataService.searchOption.filter((s) => s.id !== res.id);
        //         if (search.length !== 0) searchRes = [...searchRes, res];
        //     }
        // } else {
        //     searchRes = result;
        // }

        if (this.dataService.searchOption.length !== 0) {
            var search = result.map((res) => res).filter((res) => this.dataService.searchOption.indexOf(res) === -1);

            searchRes = search;
        } else {
            searchRes = result;
        }

        if (result) return (this.autoCompleteList = [...searchRes]);
        this.autoCompleteList = [];
    }
}
