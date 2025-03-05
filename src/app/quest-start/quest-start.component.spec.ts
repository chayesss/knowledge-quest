import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestStartComponent } from './quest-start.component';

describe('QuestStartComponent', () => {
  let component: QuestStartComponent;
  let fixture: ComponentFixture<QuestStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
