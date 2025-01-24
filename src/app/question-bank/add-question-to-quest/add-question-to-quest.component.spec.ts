import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionToQuestComponent } from './add-question-to-quest.component';

describe('AddQuestionToQuestComponent', () => {
  let component: AddQuestionToQuestComponent;
  let fixture: ComponentFixture<AddQuestionToQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestionToQuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionToQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
