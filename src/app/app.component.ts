import { Component } from '@angular/core';
import { TitleMetadataService } from './services/title-metadata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public constructor(private titleMetaService: TitleMetadataService) {
    this.titleMetaService.setTitleAndTags();
  }
 
}
