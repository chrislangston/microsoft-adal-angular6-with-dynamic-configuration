import { TestBed } from '@angular/core/testing';

import { ClientsettingsService } from './clientsettings.service';

describe('ClientsettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientsettingsService = TestBed.get(ClientsettingsService);
    expect(service).toBeTruthy();
  });
});
