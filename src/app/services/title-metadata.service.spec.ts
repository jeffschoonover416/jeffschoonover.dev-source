import { TestBed } from '@angular/core/testing';

import { TitleMetadataService } from './title-metadata.service';

describe('TitleMetadataService', () => {
  let service: TitleMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
