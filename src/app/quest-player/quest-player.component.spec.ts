import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestPlayerComponent } from './quest-player.component';

describe('QuestPlayerComponent', () => {
  let component: QuestPlayerComponent;
  let fixture: ComponentFixture<QuestPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
