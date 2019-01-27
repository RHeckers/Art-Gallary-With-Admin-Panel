import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GallaryComponent } from './gallary.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { BioComponent } from '../bio/bio.component';
import { InfoComponent } from '../info/info.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  
};


@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    
    
    
  ],
  declarations: [GallaryComponent,InfoComponent,BioComponent],
  exports: [GallaryComponent,InfoComponent,BioComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
    ,
  ]
})
export class GalleryModule { }
