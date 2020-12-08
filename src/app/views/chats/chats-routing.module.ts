import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SingleChatComponent } from "./single-chat/single-chat.component";
// import { ShowAllModulesPermissionsComponent } from "./show-all-modules-permissions/show-all-modules-permissions.component";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Chat-Module"
    },
    children: [
      {
        path: "",
        component: SingleChatComponent,

      },
      {
        path: "single-chat",
        component: SingleChatComponent,

      },
      {
        path: "multi-chat",
        component: SingleChatComponent,

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule {}
