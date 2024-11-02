import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestDialogComponent } from './new-quest-dialog.component';

describe('QuestDialogComponent', () => {
  let component: QuestDialogComponent;
  let fixture: ComponentFixture<QuestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
