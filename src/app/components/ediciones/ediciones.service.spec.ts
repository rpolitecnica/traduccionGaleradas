import { TestBed } from '@angular/core/testing';

import { EdicionesService } from './ediciones.service';

describe('EdicionesService', () => {
  let service: EdicionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdicionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
