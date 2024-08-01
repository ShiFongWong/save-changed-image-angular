import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSelectorComponent } from '../icon-selector/icon-selector.component';
import { Icon } from '../models/icon.model';

@Component({
  selector: 'app-car-diagram',
  standalone: true,
  imports: [CommonModule, IconSelectorComponent],
  templateUrl: './car-diagram.component.html',
  styleUrl: './car-diagram.component.scss'
})
export class CarDiagramComponent {
  icons: Icon[] = [];
  iconList = [
    { src: 'assets/icons/accident.png' },
    { src: 'assets/icons/another-icon.png' }
    // Add more icons as needed
  ];
  

  addIcon(src: string) {
    const newIcon: Icon = {
      id: this.generateId(),
      src,
      left: 0,
      top: 0,
      width: 50,
      height: 50
    };
    this.icons.push(newIcon);
  }
  startDrag(event: MouseEvent, icon: Icon) {
    const shiftX = event.clientX - icon.left;
    const shiftY = event.clientY - icon.top;
  
    const moveIcon = (event: MouseEvent) => {
      icon.left = event.clientX - shiftX;
      icon.top = event.clientY - shiftY;
    };
  
    const stopDrag = () => {
      document.removeEventListener('mousemove', moveIcon);
      document.removeEventListener('mouseup', stopDrag);
    };
  
    document.addEventListener('mousemove', moveIcon);
    document.addEventListener('mouseup', stopDrag);
  }
  
  startResize(event: MouseEvent, icon: Icon) {
    const initialWidth = icon.width;
    const initialHeight = icon.height;
    const initialX = event.clientX;
    const initialY = event.clientY;
  
    const resizeIcon = (event: MouseEvent) => {
      icon.width = initialWidth + (event.clientX - initialX);
      icon.height = initialHeight + (event.clientY - initialY);
    };
  
    const stopResize = () => {
      document.removeEventListener('mousemove', resizeIcon);
      document.removeEventListener('mouseup', stopResize);
    };
  
    document.addEventListener('mousemove', resizeIcon);
    document.addEventListener('mouseup', stopResize);
  }
  
  generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  saveState() {
    const state = JSON.stringify(this.icons);
    localStorage.setItem('canvasState', state);
  }

  loadState() {
    const state = localStorage.getItem('canvasState');
    if (state) {
      this.icons = JSON.parse(state);
    }
  }
}
