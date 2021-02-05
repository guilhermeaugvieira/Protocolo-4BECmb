import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocExternoComponent } from './doc-externo.component';

describe('DocExternoComponent', () => {
  let component: DocExternoComponent;
  let fixture: ComponentFixture<DocExternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocExternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
