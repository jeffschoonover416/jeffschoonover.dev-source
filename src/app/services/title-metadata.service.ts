import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleMetadataService {

  public constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private srs: ScullyRoutesService,
    private meta: Meta) {}

    readonly tagDescription: string = 'Learn to build fast, secure websites with Angular and Scully, and build desktop apps with Angular and Electron';
    readonly urlPrefix: string = 'https://jeffschoonover.dev';
    readonly siteName: string = 'Jeff Schoonover';
    readonly userTwitter: string = '@jjschooney';

    setTitleAndTags() {
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          //this while loop ensures we get the entire route instead of just a fragment
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
      ).subscribe(() => {
        this.srs.getCurrent().subscribe(
          link => {
            this.meta.updateTag({ name: 'twitter:url', content: this.urlPrefix + this.router.url });
            this.meta.updateTag({ name: 'og:url', content: this.urlPrefix + this.router.url });
            this.meta.updateTag({ name: 'og:site_name', property: 'og:site_name', content: this.siteName});
            this.meta.updateTag({ name: 'twitter:creator', content: this.userTwitter});
            this.meta.updateTag({ name: 'twitter:site', content: this.userTwitter});
            
            if (link?.title) {
              this.titleService.setTitle(link.title);
              this.meta.updateTag({ name: 'description', content: link.description });
              this.meta.updateTag({ name: 'og:title', property: 'og:title', content: link.title });
              this.meta.updateTag({ name: 'og:description', property: 'og:description', content: link.description});
              this.meta.updateTag({ name: 'og:type', property: 'og:type', content: 'article' });
              this.meta.updateTag({ name: 'twitter:title', content: link.title.substring(0, 69) });
              this.meta.updateTag({ name: 'twitter:description', content: (link.description as string).substring(0, 123)});
            } else {
              this.titleService.setTitle(this.data.title);
              const description = this.data.desc ? this.data.desc : this.tagDescription;
              this.meta.updateTag({ name: 'description', content: description });
              this.meta.updateTag({ name: 'og:title', content: this.data.title });
              this.meta.updateTag({ name: 'og:description', content: description });
              this.meta.updateTag({ name: 'og:type', content: 'website' });
              this.meta.updateTag({ name: 'twitter:title', content: this.data.title });
              this.meta.updateTag({ name: 'twitter:description', content: description.substring(0, 123) });
            }
          });
      });
    }

    private get data() { return this.activatedRoute.snapshot.firstChild.data; }
}




