import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScoreboardComponent } from './team-scoreboard.component';

describe('TeamScoreboardComponent', () => {
  let component: TeamScoreboardComponent;
  let fixture: ComponentFixture<TeamScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamScoreboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
