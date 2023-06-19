import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {


  ngOnInit(): void {

    const myFont = new FontFace('Badaboom', 'url(assets/fonts/BADABB__.TTF)');
    const impact = new FontFace('impact', 'url(assets/fonts/impact.ttf)');
    const Impacted = new FontFace('Impacted', 'url(assets/fonts/Impacted.ttf)');
    myFont.load().then((font) => (document.fonts as any).add(font));
    impact.load().then((impact) => (document.fonts as any).add(impact));
    Impacted.load().then((Impacted) => (document.fonts as any).add(Impacted));
  }
}
