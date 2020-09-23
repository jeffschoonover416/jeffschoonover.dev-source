import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinEmailComponent } from './join-email.component';

describe('JoinEmailComponent', () => {
  let component: JoinEmailComponent;
  let fixture: ComponentFixture<JoinEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
