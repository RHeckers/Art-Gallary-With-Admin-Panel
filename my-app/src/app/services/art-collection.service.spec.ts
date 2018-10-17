import { TestBed } from '@angular/core/testing';

import { ArtCollectionService } from './art-collection.service';

describe('ArtCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtCollectionService = TestBed.get(ArtCollectionService);
    expect(service).toBeTruthy();
  });
});
