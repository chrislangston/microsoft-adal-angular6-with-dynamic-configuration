import { Injectable } from '@angular/core';
import { ClientSettings } from './clientsettings.model';

@Injectable({
  providedIn: 'root'
})
export class ClientSettingsService {

  public clientSettings: ClientSettings;
  constructor() { }
}
