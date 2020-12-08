import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from './profile/profile.component';
import { UserTimelineComponent } from './user-timeline/user-timeline.component';
import { AboutUserComponent } from './about-user/about-user.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { UserQualificationComponent  } from './user-qualification/user-qualification.component';
import { UserExperienceComponent } from './user-experience/user-experience.component';
import { UserCertificatesComponent } from './user-certificates/user-certificates.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { UserQuotationsComponent } from './user-quotations/user-quotations.component';
import { UserServicesComponent } from './user-services/user-services.component';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "User-Profile"
    },
    children: [
      {
        path: "",
        component: UserTimelineComponent,

      },
      {
        path: "time-line",
        component: UserTimelineComponent,

      },
      {
        path: "user-friends",
        component: UserFriendsComponent,

      },
      {
        path: "about",
        component: AboutUserComponent,

      },
      {
        path: "profile-setting",
        component: ProfileSettingComponent,

      },
      {
        path: "user-qualification",
        component: UserQualificationComponent,

      },
      {
        path: "user-quotations",
        component: UserQuotationsComponent,

      },
      {
        path: "user-certificates",
        component: UserCertificatesComponent,

      },
      {
        path: "user-articles",
        component: UserArticlesComponent,

      },
      {
        path: "user-services",
        component: UserServicesComponent,

      },
      {
        path: "user-experience",
        component: UserExperienceComponent,

      },
      
      {
        path: "profile",
        component: ProfileComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
