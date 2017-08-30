import { TestBed, inject } from '@angular/core/testing';

import { FileCategoriesService } from './file-categories.service';

describe('FileCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileCategoriesService]
    });
  });

  it('should be created', inject([FileCategoriesService], (service: FileCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
