import { TestBed } from '@angular/core/testing';

import { ListadoArticulosService } from './listado-articulos.service';

describe('ListadoArticulosService', () => {
  let service: ListadoArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoArticulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
