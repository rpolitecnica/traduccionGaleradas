import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTraduccionesComponent } from './listado-traducciones.component';

describe('ListadoTraduccionesComponent', () => {
  let component: ListadoTraduccionesComponent;
  let fixture: ComponentFixture<ListadoTraduccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoTraduccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTraduccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
