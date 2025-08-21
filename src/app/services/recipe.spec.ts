// src/app/services/recipe.spec.ts  (yolu kendine göre ayarla)
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RecipeService } from './recipe';

describe('RecipeService (Jest)', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipeService],
    });

    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  afterEach(() => {
    httpMock.verify();
  });

  it('should call lookupMealDetailById with correct URL & params', () => {
    service.lookupMealDetailById('12345').subscribe();

    const req = httpMock.expectOne(
      (r) => r.url.endsWith('/lookup.php') && r.params.get('i') === '12345'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ meals: [{ idMeal: '12345' }] });
  });

  it('should return null when lookupMealDetailById has no meals', (done) => {
    service.lookupMealDetailById('x').subscribe((meal) => {
      expect(meal).toBeNull();
      done();
    });
    const req = httpMock.expectOne((r) => r.url.endsWith('/lookup.php'));
    req.flush({ meals: null }); // veya { meals: [] }
  });

  it('should return first meal when lookupMealDetailById has meals', (done) => {
    const mockMeal = { idMeal: '12345', strMeal: 'Test Meal' };

    service.lookupMealDetailById('12345').subscribe((meal) => {
      expect(meal).toEqual(mockMeal);
      done();
    });

    const req = httpMock.expectOne((r) => r.url.endsWith('/lookup.php'));
    req.flush({ meals: [mockMeal] });
  });

  it('should call listAllCategories with correct URL', () => {
    service.listAllCategories().subscribe();

    const req = httpMock.expectOne((r) => r.url.endsWith('/categories.php'));
    expect(req.request.method).toBe('GET');
    req.flush({ categories: [] });
  });

  it('should return categories array from listAllCategories', (done) => {
    const mockCategories = [{ strCategory: 'Dessert' }];

    service.listAllCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories); // service map'liyorsa
      done();
    });

    const req = httpMock.expectOne((r) => r.url.endsWith('/categories.php'));
    req.flush({ categories: mockCategories });
  });

  it('should call filterByCategories with correct URL & params', () => {
    service.filterByCategories('Dessert').subscribe();

    const req = httpMock.expectOne(
      (r) => r.url.endsWith('/filter.php') && r.params.get('c') === 'Dessert'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ meals: [] });
  });

  it('should return meals array from filterByCategories', (done) => {
    const mockMeals = [{ idMeal: '123', strMeal: 'Cake' }];

    service.filterByCategories('Dessert').subscribe((meals) => {
      expect(meals).toEqual(mockMeals);
      done();
    });

    const req = httpMock.expectOne((r) => r.url.endsWith('/filter.php'));
    req.flush({ meals: mockMeals });
  });

  it('should return [] when filterByCategories meals is null', (done) => {
    service.filterByCategories('Dessert').subscribe((meals) => {
      expect(meals).toEqual([]); // null → []
      done();
    });

    const req = httpMock.expectOne((r) => r.url.endsWith('/filter.php'));
    req.flush({ meals: null });
  });

  it('should propagate HTTP error from lookupMealDetailById', (done) => {
    service.lookupMealDetailById('1').subscribe({
      next: () => {
        fail('should not emit next');
      },
      error: (err) => {
        expect(err.status).toBe(500);
        done();
      },
    });

    const req = httpMock.expectOne((r) => r.url.endsWith('/lookup.php'));
    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });
  });
});
