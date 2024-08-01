import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngFor="let icon of icons" (click)="selectIcon(icon)">
      {{ icon }}
    </button>
  `,
})
export class IconSelectorComponent {
  @Output() iconSelected = new EventEmitter<string>();

  icons = ['🚗', '🚕', '🚙', '🚓', '🚑', '🚒']; // Example icons

  selectIcon(icon: string) {
    this.iconSelected.emit(icon);
  }
}
