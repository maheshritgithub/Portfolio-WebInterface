import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: "en" = "en";

  constructor(
    public translateService: TranslateService,
  ) {}

  initLanguage(){
    this.translateService.addLangs(["en", "es"]);
    const defaultLanguage = "en";
    this.translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(defaultLanguage);
    this.language = defaultLanguage;
  }
}