import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedQuestionnaireComponent } from './saved-questionnaire.component';

describe('SavedQuestionnaireComponent', () => {
  let component: SavedQuestionnaireComponent;
  let fixture: ComponentFixture<SavedQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
