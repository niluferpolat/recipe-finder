import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Category, Meal } from '@recipe-finder/shared';
import { RecipeService } from '../../services/recipe';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';

@Component({
  selector: 'app-results-grid',
  imports: [MatCardModule, MatButtonModule, NgFor, AsyncPipe, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results-grid.component.html',
  styleUrl: './results-grid.component.css',
})
export class ResultsGridComponent implements OnChanges {
  @Input() category: Category | null = null;
  private recipeService = inject(RecipeService);

  readonly dialog = inject(MatDialog);
  meals$: Observable<Meal[]> = of([]);

  ngOnChanges(): void {
    if (this.category) {
      this.meals$ = this.recipeService.filterByCategories(
        this.category.strCategory
      );
    } else {
      this.meals$ = of([]);
    }
  }
  openDialog(meal: Meal): void {
    const dialogRef = this.dialog.open(RecipeDetailComponent, {
      data: meal,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
