import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitFrequencyComponent } from './commit-frequency.component';

describe('CommitFrequencyComponent', () => {
  let component: CommitFrequencyComponent;
  let fixture: ComponentFixture<CommitFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitFrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
