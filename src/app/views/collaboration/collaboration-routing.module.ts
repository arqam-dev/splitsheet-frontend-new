import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollaborationComponent } from './all-collaborations/collaboration.component';
import { PendingCollaborationComponent } from './pending-collaborations/pending-collaboration.component';
import { AcceptedCollaborationComponent } from './accepted-collaborations/accepted-collaboration.component';
import { RejectedCollaborationComponent } from './rejected-collaborations/rejected-collaboration.component';
import { AddCollaborationComponent } from './add-collaboration/add-collaboration.component';

const routes: Routes = [
  {
    path: '',
    component: CollaborationComponent,
    data: {
      title: 'Collaborations'
    }
  },
  {
    path: 'pending-collaborations',
    component: PendingCollaborationComponent,
    data: {
      title: 'Pending Collaborations'
    }
  },
  {
    path: 'accepted-collaborations',
    component: AcceptedCollaborationComponent,
    data: {
      title: 'Accepted Collaborations'
    }
  },
  {
    path: 'rejected-collaborations',
    component: RejectedCollaborationComponent,
    data: {
      title: 'Rejected Collaborations'
    }
  },
  {
    path: 'accepted-collaborations',
    component: AcceptedCollaborationComponent,
    data: {
      title: 'Accepted Collaborations'
    }
  },
  {
    path: 'add-collaboration',
    component: AddCollaborationComponent,
    data: {
      title: 'Add New Collaboration'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaborationRoutingModule { }
