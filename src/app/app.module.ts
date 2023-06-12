import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InsightsComponent } from './components/insights/insights.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopContributorByCommitComponent } from './components/insights/top-contributor-by-commit/top-contributor-by-commit.component';
import { TopContributorByPRComponent } from './components/insights/top-contributor-by-pr/top-contributor-by-pr.component';
import { CommitFrequencyComponent } from './components/insights/commit-frequency/commit-frequency.component';
import { ComparisonTableComponent } from './components/insights/comparison-table/comparison-table.component';

@NgModule({
  declarations: [AppComponent, InsightsComponent, SettingsComponent, TopContributorByCommitComponent, TopContributorByPRComponent, CommitFrequencyComponent, ComparisonTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
