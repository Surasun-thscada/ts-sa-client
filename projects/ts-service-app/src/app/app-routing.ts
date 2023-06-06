import { Route } from '@angular/router';

export const ROUTES: Route[] = [
    { path: '', loadComponent: () => import('./features/home/home.component').then(mod => mod.HomeComponent) },
    { path: 'about', loadComponent: () => import('./features/about/about.component').then(mod => mod.AboutComponent) },
    { path: 'workflow-manager', loadComponent: () => import('./features/workflow/workflow-manager/workflow-manager.component').then(mod => mod.WorkflowManagerComponent) },
    { path: 'user-profile', loadComponent: () => import('./features/user-profile/user-profile.component').then(mod => mod.UserProfileComponent) },
    { path: 'user-settings', loadComponent: () => import('./features/settings/user-settings/user-settings.component').then(mod => mod.UserSettingsComponent) },
    { path: 'project', loadComponent: () => import('./features/project/project.component').then(mod => mod.ProjectComponent) },
    { path: 'job', loadComponent: () => import('./features/job/job.component').then(mod => mod.JobComponent) },
];