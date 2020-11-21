import { TestBed } from '@angular/core/testing';

import { ListadoTraduccionesService } from './listado-traducciones.service';

describe('ListadoTraduccionesService', () => {
  let service: ListadoTraduccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoTraduccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
