import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { Title } from '@angular/platform-browser';
import { R3SelectorScopeMode } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts!:Post[];


  url = 'https://jsonplaceholder.typicode.com/posts';
  
  constructor(private http:HttpClient) { }
   
   

    
 
  ngOnInit(): void {

    this.http.get<Array<Post>>(this.url)
    .subscribe(response =>{
      this.posts = response;
      
      
    });

   
    
  }


  createPost(title:HTMLInputElement){

    let post =  new Post();
    post.title = title.value;
    this.posts.splice(0 ,0 ,post);
    title.value = '';



    this.http.post<Post>(this.url ,post)
    .subscribe(response => {
      console.log(response);
      
    });





      
  }


  updatePost(post: { id: number; title: any; }){
    this.http.patch<Post>(this.url + '/' + post.id , JSON.stringify(post.title))
    .subscribe(response =>{
      console.log(response);
    
    });

  }



  deletePost(post: any){
    let index =  this.posts.indexOf(post);
    this.posts.splice(index ,1)


    this.http.delete(this.url + '/' + post.id)
       .subscribe(response => {
        console.log(response);
        
       });


  }




}
