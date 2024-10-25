import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitQuestionDialogComponent } from './submit-question-dialog.component';

describe('SubmitQuestionDialogComponent', () => {
  let component: SubmitQuestionDialogComponent;
  let fixture: ComponentFixture<SubmitQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitQuestionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
