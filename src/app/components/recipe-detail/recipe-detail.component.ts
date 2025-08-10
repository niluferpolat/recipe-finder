import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../services/recipe';
import { Meal } from '@recipe-finder/shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-recipe-detail',
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  loading = true;
  private recipeService = inject(RecipeService);
  ngOnInit(): void {
    this.recipeService.lookupMealDetailById(this.data.idMeal).subscribe({
      next: (meal) => {
        if (meal) {
          this.loading = false;
          console.log(this.loading);
          this.data = meal;
        } else {
          console.error('Meal not found');
        }
      },
      error: (error) => {
        console.error('Error fetching meal details:', error);
      },
    });
  }

  closeDialog(): void {
    const dialog = inject(MatDialog);
    dialog.closeAll();
  }

  get ingredients(): string[] {
    return Object.keys(this.data)
      .filter((key) => key.startsWith('strIngredient') && this.data[key])
      .map((key) => this.data[key]);
  }

  get measures(): string[] {
    return Object.keys(this.data)
      .filter((key) => key.startsWith('strMeasure') && this.data[key])
      .map((key) => this.data[key]);
  }
}
