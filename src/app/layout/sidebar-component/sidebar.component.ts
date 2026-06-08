import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
protected readonly navigationItems = signal<NavigationItem[]>([
  {
    icon: '⌂',
    label: 'Dashboard',
    route: '/dashboard'
  },
  {
    icon: '□',
    label: 'Productos',
    route: '/productos'
  },
  {
    icon: '⇄',
    label: 'Compras',
    route: '/compras'
  },
  {
    icon: '▤',
    label: 'Ventas',
    route: '/ventas'
  },
  {
    icon: '□',
    label: 'Kardex',
    route: '/kardex'
  }
]);
}
