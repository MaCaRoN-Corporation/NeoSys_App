import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Salle de l\'Eveil', url: '/folder/WakeUpPage', icon: 'mail' },
    { title: 'Sanctuaire des Paliers', url: '/folder/SanctuaryPage', icon: 'paper-plane' },
    { title: 'Répertoire des Quêtes', url: '/folder/QuestsPage', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }
}