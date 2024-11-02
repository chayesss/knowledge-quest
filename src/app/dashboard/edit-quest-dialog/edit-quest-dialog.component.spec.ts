import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestDialogComponent } from './edit-quest-dialog.component';

describe('EditQuestDialogComponent', () => {
  let component: EditQuestDialogComponent;
  let fixture: ComponentFixture<EditQuestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQuestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
