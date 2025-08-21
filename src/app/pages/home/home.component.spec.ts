import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { RecipeService } from '../../services/recipe';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  const recipeServiceMock = {
    listAllCategories: jest.fn(),
    filterByCategories: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit çağrıldığında categories dolmalı ve ilk category seçilmeli', () => {
    const mockCategories = [
      { strCategory: 'Dessert', strCategoryThumb: 'dessert.jpg' },
      { strCategory: 'Seafood', strCategoryThumb: 'seafood.jpg' },
    ];

    recipeServiceMock.listAllCategories.mockReturnValue(of(mockCategories));
    recipeServiceMock.filterByCategories.mockReturnValue(of([]));

    component.ngOnInit();

    expect(recipeServiceMock.listAllCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
    expect(component.selectedCategory).toEqual(mockCategories[0]);
    expect(recipeServiceMock.filterByCategories).toHaveBeenCalledWith('Dessert');
  });

  it('template kategori label göstermeli', () => {
    const mockCategories = [
      { strCategory: 'Dessert', strCategoryThumb: 'dessert.jpg' },
    ];

    recipeServiceMock.listAllCategories.mockReturnValue(of(mockCategories));
    recipeServiceMock.filterByCategories.mockReturnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Dessert');
  });
});
