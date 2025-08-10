import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecipeService } from '../../services/recipe';
import { Category } from '@recipe-finder/shared';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ResultsGridComponent } from 'src/app/components/results-grid/results-grid.component';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCheckboxModule,
    NgFor,
    MatTooltipModule,
    MatDividerModule,
    ResultsGridComponent,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private recipeService = inject(RecipeService);
  categories: Category[] = [];
  selectedCategory: Category | null = null;

  ngOnInit() {
    this.recipeService.listAllCategories().subscribe({
      next: (data) => {
        this.categories = Array.isArray(data) ? data : [];
        this.selectedCategory =
          this.categories.length > 0 ? this.categories[0] : null;
        if (this.selectedCategory) {
          this.recipeService
            .filterByCategories(this.selectedCategory.strCategory)
            .subscribe();
        }
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
  selectOnly(category: Category) {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
  }
}
