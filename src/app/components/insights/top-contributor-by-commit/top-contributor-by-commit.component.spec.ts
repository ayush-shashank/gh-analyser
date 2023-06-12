import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContributorByCommitComponent } from './top-contributor-by-commit.component';

describe('TopContributorByCommitComponent', () => {
  let component: TopContributorByCommitComponent;
  let fixture: ComponentFixture<TopContributorByCommitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopContributorByCommitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopContributorByCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
