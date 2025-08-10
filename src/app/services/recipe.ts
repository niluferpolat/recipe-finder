import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Meal, Category } from '@recipe-finder/shared';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  private readonly http = inject(HttpClient);

  lookupMealDetailById(id: string): Observable<Meal | null> {
    return this.http
      .get<{ meals: Meal[] }>(`${this.baseUrl}/lookup.php?i=${id}`)
      .pipe(map((response) => response.meals?.[0] || null));
  }
  listAllCategories() {
    return this.http
      .get<{ categories: Category[] }>(`${this.baseUrl}/categories.php`)
      .pipe(map((response) => response.categories));
  }

  filterByCategories(category: string): Observable<Meal[]> {
    return this.http
      .get<{ meals: Meal[] }>(`${this.baseUrl}/filter.php?c=${category}`)
      .pipe(map((response) => response.meals));
  }
}
