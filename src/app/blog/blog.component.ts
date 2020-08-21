import { Component, OnInit} from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private scully: ScullyRoutesService) { }
  

  ngOnInit() {
    //this.scully.available$.subscribe(routes => console.log(routes));
  }

  $blogPosts = this.scully.available$.pipe(
    map(routes =>
      routes.filter(
        route => 
        route.route.startsWith('/posts/') && route.sourceFile.endsWith('.md')
      )
    )
  );

  

  
  

  
}
