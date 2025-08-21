import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { ResultsGridComponent } from './results-grid.component';
import { RecipeService } from '../../services/recipe';
import { MatDialog } from '@angular/material/dialog';

describe('ResultsGridComponent', () => {
  let fixture: ComponentFixture<ResultsGridComponent>;
  let component: ResultsGridComponent;

  const recipeServiceMock = {
    filterByCategories: jest.fn().mockReturnValue(of([{ idMeal: '1', strMeal: 'Mock Meal', strMealThumb: 'thumb.jpg' }])),
   lookupMealDetailById: jest.fn().mockReturnValue(of({ idMeal: '1', strMeal: 'Mock Meal Detail' })),

  };

  const dialogMock = {
    open: jest.fn().mockReturnValue({
      afterClosed: () => of('closed'),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsGridComponent], 
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsGridComponent);
    component = fixture.componentInstance;
  });

  it('oluşmalı', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges çağrıldığında filterByCategories çağırmalı', () => {
    component.category = { strCategory: 'Dessert' } as any;
    component.ngOnChanges();
    expect(recipeServiceMock.filterByCategories).toHaveBeenCalledWith('Dessert');
  });

  it('template yemek adını göstermeli', () => {
    component.category = { strCategory: 'Dessert' } as any;
    component.ngOnChanges();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mock Meal');
  });
});
