import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SaisieService {
  constructor() {}

  typeCaracteristiques = [
    {
      id: 1,
      option:
        '4-GF -Lot #01-Veeralin LLIN-Polyéthylène-MII PBO-VKA Polymers -TANA',
    },
    {
      id: 2,
      option:
        '5-GF -Lot #02-Veeralin LLIN-Polyéthylène-MII PBO-VKA Polymers -TOLAGNARO',
    },
    {
      id: 3,
      option:
        '7-GF -Lot #04-Yorkool LN-Polyester-MII SINGLE-Tianjin Yorkool-TOAMASINA',
    },
    {
      id: 4,
      option: '1-PMI -Lot #01-SafeNet-Polyester-Standard-Fujian Yamei-TANA',
    },
    {
      id: 5,
      option:
        '2-PMI -Lot #02-SafeNet-Polyester-Standard-Fujian Yamei-TOAMASINA',
    },
    {
      id: 6,
      option: '3-PMI -Lot #03-PermaNet Dual-Polyester-Dual-Vestergaard-TANA',
    },
  ];

  destinationOptions = [
    { id: 1, option: 'destination 1' },
    { id: 2, option: 'destination 2' },
    { id: 3, option: 'destination 3' },
  ];
}
