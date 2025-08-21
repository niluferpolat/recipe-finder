// recipe-detail.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail.component';

describe('RecipeDetailComponent (Jest)', () => {
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let component: RecipeDetailComponent;

  const mockData: any = {
    idMeal: '123',
    strMeal: 'Test Meal',
    strMealThumb: 'http://img/meal.jpg',
    strInstructions: 'Cook it.',
    strSource: 'https://example.com',
    strYoutube: 'https://youtube.com',
    strCategory: 'Dessert',
    strArea: 'Global',
    strTags: 'sweet, easy',
    strImageSource: 'https://example.com/image.jpg',
    strCreativeCommonsConfirmed: 'Yes',
    strDateModified: '2023-10-01',
    strIngredient0: 'Sugar',
    strIngredient1: 'Sugar',
    strIngredient2: '',
    strIngredient3: null,
    strMeasure1: '1 tsp',
    strMeasure2: '',
    strMeasure3: null,
  };

  const dialogMock = { closeAll: jest.fn() };

  let markForCheckSpy: jest.SpyInstance;

  beforeEach(async () => {
    markForCheckSpy = jest.spyOn(ChangeDetectorRef.prototype, 'markForCheck');

    await TestBed.configureTestingModule({
      imports: [
        RecipeDetailComponent,   // standalone component
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;

   
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('oluşur', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit ile loading=false olur ve markForCheck çağrılır', () => {
    expect((component as any).loading).toBe(false);
    expect(markForCheckSpy).toHaveBeenCalled();
  });

  it('ingredients getter boş/falsey değerleri filtreler', () => {
    expect(component.ingredients).toEqual(['Sugar']);
  });

  it('measures getter boş/falsey değerleri filtreler', () => {
    expect(component.measures).toEqual(['1 tsp']);
  });

  it('closeDialog MatDialog.closeAll çağırır', () => {
    component.closeDialog();
    expect(dialogMock.closeAll).toHaveBeenCalledTimes(1);
  });
  it('başlık DOM’da render olur (varsa)', () => {
    const h2: HTMLHeadingElement | null = fixture.nativeElement.querySelector('h2');
    if (h2) expect(h2.textContent).toContain('Test Meal');
  });
});
