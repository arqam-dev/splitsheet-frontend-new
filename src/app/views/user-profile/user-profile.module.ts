// Angular
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { ProfileComponent } from "./profile/profile.component";

import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserTimelineComponent } from "./user-timeline/user-timeline.component";
import { AboutUserComponent } from "./about-user/about-user.component";
import { ProfileSettingComponent } from "./profile-setting/profile-setting.component";
import { UserFriendsComponent } from "./user-friends/user-friends.component";
import {
  UserQualificationComponent,
  UserQualificationModalComponent
} from "./user-qualification/user-qualification.component";
import {
  UserExperienceComponent,
  UserExperienceModalComponent
} from "./user-experience/user-experience.component";
import {
  UserCertificatesComponent,
  UserCertificatesModalComponent
} from "./user-certificates/user-certificates.component";
import {
  UserArticlesComponent,
  UserArticlesModalComponent
} from "./user-articles/user-articles.component";
import { UserQuotationsComponent } from "./user-quotations/user-quotations.component";
import {
  UserServicesComponent,
  UserServicesModalComponent
} from "./user-services/user-services.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";

import { AppComponent } from "../../app.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserProfileRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule
  ],
  entryComponents: [
    UserServicesComponent,
    UserServicesModalComponent,
    UserQualificationComponent,
    UserQualificationModalComponent,
    UserExperienceComponent,
    UserExperienceModalComponent,
    UserCertificatesComponent,
    UserCertificatesModalComponent,
    UserArticlesComponent,
    UserArticlesModalComponent
  ],
  declarations: [
    ProfileComponent,
    UserTimelineComponent,
    AboutUserComponent,
    ProfileSettingComponent,
    UserFriendsComponent,
    UserQualificationComponent,
    UserExperienceComponent,
    UserCertificatesComponent,
    UserArticlesComponent,
    UserQuotationsComponent,
    UserServicesComponent,
    UserServicesModalComponent,
    UserQualificationModalComponent,
    UserExperienceModalComponent,
    UserCertificatesModalComponent,
    UserArticlesModalComponent
  ]
})
export class ProfileModule {}
