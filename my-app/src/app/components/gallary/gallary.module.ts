import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GallaryComponent } from './gallary.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  
};


@NgModule({
  imports: [
    CommonModule,
    SwiperModule
  ],
  declarations: [GallaryComponent],
  exports: [GallaryComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class GalleryModule { }
