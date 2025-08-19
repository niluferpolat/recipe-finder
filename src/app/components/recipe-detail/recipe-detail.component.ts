import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-recipe-detail',
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
    private cdr = inject(ChangeDetectorRef);
  loading = true;
    @ViewChild('content') contentEl!: ElementRef;
  ngOnInit(): void {
   console.log(this.data,)
    this.loading = false;
    this.cdr.markForCheck();
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
