import { Component, ViewChildren, QueryList, ElementRef} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChildren('container1, container2') containers: QueryList<ElementRef<HTMLDivElement>> | undefined;
  // Add more ViewChildren properties for additional containers

  constructor() { }

  async downloadAllImages() {
    if(this.containers){
      const canvases = await Promise.all(this.containers.map(container => html2canvas(container.nativeElement)));
      const containerElements = this.containers.map(container => container.nativeElement);
      const combinedCanvas = this.combineCanvases(canvases, containerElements);
      const dataUrl = combinedCanvas.toDataURL('image/png');
      this.download(dataUrl, 'combined.png');
    }
  }

  private combineCanvases(canvases: HTMLCanvasElement[], elements: HTMLDivElement[]): HTMLCanvasElement {
    const positions = elements.map(element => ({
      top: element.offsetTop,
      left: element.offsetLeft,
      width: element.offsetWidth,
      height: element.offsetHeight
    }));

    const totalHeight = Math.max(...positions.map(pos => pos.top + pos.height));
    const totalWidth = Math.max(...positions.map(pos => pos.left + pos.width));

    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = totalWidth;
    combinedCanvas.height = totalHeight;

    const ctx = combinedCanvas.getContext('2d');
    if(ctx){
      positions.forEach((pos, index) => {
        ctx.drawImage(canvases[index], pos.left, pos.top, pos.width, pos.height);
      });
    }
    return combinedCanvas;
  }

  private download(dataUrl: string, filename: string) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
