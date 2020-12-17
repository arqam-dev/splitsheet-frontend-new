import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { UserTimelineComponent } from "./views/test/user-timeline.component";
import {AuthGuard} from './views/service/Auth/authGuard.service';
import { UnauthGuard} from './views/service/unauthGaurd.service';
export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404"
    }
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500"
    }
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page"
    }
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page"
    }
  },
  // {
  //   path: "test",
  //   component: UserTimelineComponent,
  //   data: {
  //     title: "Time Line"
  //   }
  // },
  {
    path: "",
    canActivate:[AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: "Home"
    },
    children: [
      // {
      //   path: "base",
      //   loadChildren: () =>
      //     import("./views/base/base.module").then(m => m.BaseModule)
      // },
      // {
      //   path: "buttons",
      //   loadChildren: () =>
      //     import("./views/buttons/buttons.module").then(m => m.ButtonsModule)
      // },
      // {
      //   path: "charts",
      //   loadChildren: () =>
      //     import("./views/chartjs/chartjs.module").then(m => m.ChartJSModule)
      // },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            m => m.DashboardModule
          )
      },
      {
        path: "collaborations",
        loadChildren: () =>
          import("./views/collaboration/collaboration.module").then(
            m => m.CollaborationModule
          )
      },
      // {
      //   path: "icons",
      //   loadChildren: () =>
      //     import("./views/icons/icons.module").then(m => m.IconsModule)
      // },
      // {
      //   path: "notifications",
      //   loadChildren: () =>
      //     import("./views/notifications/notifications.module").then(
      //       m => m.NotificationsModule
      //     )
      // },
      // {
      //   path: "theme",
      //   loadChildren: () =>
      //     import("./views/theme/theme.module").then(m => m.ThemeModule)
      // },
      // {
      //   path: "widgets",
      //   loadChildren: () =>
      //     import("./views/widgets/widgets.module").then(m => m.WidgetsModule)
      // },
      // {
      //   path: "custom-role",
      //   loadChildren: () =>
      //     import("./views/custom-role/customrole.module").then( m => m.CustomRoleModule)
      // },
      // {
      //   path: "custom-module",
      //   loadChildren: () =>
      //     import("./views/custom-module/custommodule.module").then(
      //       m => m.CustomModuleModule
      //     )
      // },
      {
        path: "profile",
        loadChildren: () =>
        import("./views/user-profile/user-profile.module")
        .then(m => m.ProfileModule)
          // import("./views/user-profile/user-profile.module").then(m => m.ProfileModule)
      },
      // {
      //   path: "chats",
      //   loadChildren: () =>
      //     import("./views/chats/chats.module").then(
      //       m => m.ChatsModule
      //     )
      // },
      // {
      //   path: "all-users",
      //   loadChildren: () =>
      //     import("./views/view-all-users/view-all-users.module").then(
      //       m => m.ViewAllUsersModule
      //     )
      // }
    ]
  },
  { path: "**", component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
