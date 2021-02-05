import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocInternoComponent } from './doc-interno.component';

describe('DocInternoComponent', () => {
  let component: DocInternoComponent;
  let fixture: ComponentFixture<DocInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
