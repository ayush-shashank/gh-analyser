import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  pat = '';
  repoName = '';
  owner = '';
  repoList: { name: string; selected: boolean }[] = [
    { name: 'ayush-shashank/dda', selected: false },
    { name: 'ayush-shashank/CPAD-Project', selected: false },
    { name: 'ayush-shashank', selected: false },
  ];
  constructor(private settings: SettingsService) {
    this.pat = 'ajsgh';
  }
  setNewToken() {}
  selectRepos() {}

  changeSelect($event: any) {
    let i = this.repoList.findIndex((repo) => repo.name == $event.target.value);
    this.repoList[i].selected = $event.target.checked ? true : false;
  }
  removeRepo(i: number) {
    console.log('splice');
    this.repoList.splice(i, 1);
  }
  addRepo() {
    console.log(this.owner, this.repoName);
    this.settings.addRepoToList(this.owner, this.repoName);
    this.owner = '';
    this.repoName = '';
  }

}
