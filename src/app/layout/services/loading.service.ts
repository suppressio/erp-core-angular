import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading:number;
  private saving:boolean;

  constructor(){
    this.loading=0;
    this.saving=false;
  }

  get isLoading():boolean{
    return this.loading>0;
  }

  set isLoading(state:boolean){
    // console.debug('loading val',this.loading);
    if (state)
      this.loading++;
    else
      if(this.loading>0)
        this.loading--;
  }

  public resetLoading(): void{
    this.loading = 0;
  }

  get isSaving():boolean{
    return this.saving;
  }

  set isSaving(state:boolean){
    this.saving=state;
  }
}
