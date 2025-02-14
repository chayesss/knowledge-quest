import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewQuestComponent } from './preview-quest.component';

describe('PreviewQuestComponent', () => {
  let component: PreviewQuestComponent;
  let fixture: ComponentFixture<PreviewQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewQuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
