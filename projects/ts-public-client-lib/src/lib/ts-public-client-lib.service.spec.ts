import { TestBed } from '@angular/core/testing';

import { TsPublicClientLibService } from './ts-public-client-lib.service';

describe('TsPublicClientLibService', () => {
  let service: TsPublicClientLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TsPublicClientLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
