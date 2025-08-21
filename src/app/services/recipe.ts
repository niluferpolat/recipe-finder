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

  lookupMealDetailById(id: string) {
  return this.http.get<{meals:any[]}>(`${this.baseUrl}/lookup.php`, { params: { i: id } })
    .pipe(map(res => res.meals?.[0] ?? null));
}
listAllCategories() {
  return this.http.get<{categories:any[]}>(`${this.baseUrl}/categories.php`)
    .pipe(map(res => res.categories ?? []));
}
filterByCategories(c: string) {
  return this.http.get<{meals:any[]}>(`${this.baseUrl}/filter.php`, { params: { c } })
    .pipe(map(res => res.meals ?? []));
}
}
