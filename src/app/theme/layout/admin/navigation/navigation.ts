import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home'
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'sources',
        title: 'Sources',
        type: 'collapse',
        icon: 'feather icon-layers',
        children: [
          {
            id: 'sources-list',
            title: 'List',
            type: 'item',
            url: '/sources/list',
          },
          {
            id: 'add-source',
            title: 'Add Source',
            type: 'item',
            url: '/sources/add',
          },
          {
            id: 'irregularsourcenames',
            title: 'Irregular Source Names',
            type: 'item',
            url: '/sources/irregularsourcenames',
          }
        ]
      },
      {
        id: 'newsourcefiles',
        title: 'New Source Files',
        type: 'item',
        url: '/sourcefiles/newfiles',
        icon: 'feather icon-file'
      },
      {
        id: 'reports',
        title: 'Reports',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'scrapedelivery',
            title: 'Scrape Delivery Report',
            type: 'item',
            url: '/reports/scrapedelivery',
          },
          {
            id: 'overduesources',
            title: 'Overdue Sources',
            type: 'item',
            url: '/reports/overduesources',
          }
        ]
      },
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
