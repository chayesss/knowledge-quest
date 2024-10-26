import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestDialogComponent } from './new-quest-dialog.component';

describe('NewQuestDialogComponent', () => {
  let component: NewQuestDialogComponent;
  let fixture: ComponentFixture<NewQuestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewQuestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQuestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
