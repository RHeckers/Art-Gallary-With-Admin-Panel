import { TestBed } from '@angular/core/testing';

import { ImageControllesService } from './image-controlles.service';

describe('ImageControllesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageControllesService = TestBed.get(ImageControllesService);
    expect(service).toBeTruthy();
  });
});
