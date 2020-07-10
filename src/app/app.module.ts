import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './component/home-page/home-page.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, HomePageComponent, SearchBarComponent],
    imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
