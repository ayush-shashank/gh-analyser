import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  personalAccessToken = new BehaviorSubject('');
  isAuth = false;
  currentUser = new BehaviorSubject<User>({
    name: '',
    login: '',
    avatarUrl: '',
  } as User);
  selectedRepos = new BehaviorSubject<{ owner: string; name: string }[]>([]);

  constructor() {}
}
