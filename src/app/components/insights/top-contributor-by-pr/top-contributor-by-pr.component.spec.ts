import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContributorByPRComponent } from './top-contributor-by-pr.component';

describe('TopContributorByPRComponent', () => {
  let component: TopContributorByPRComponent;
  let fixture: ComponentFixture<TopContributorByPRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopContributorByPRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopContributorByPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
