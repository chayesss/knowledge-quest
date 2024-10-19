import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { item } from '../shared/models/item.model';
import { Firestore, collectionData, collection, addDoc, CollectionReference } from '@angular/fire/firestore';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule, MatCardModule, MatGridListModule, MatInputModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // DEMONSTRATION ONLY - FIRESTORE LOGIC SHOULD BE MOVED TO A SERVICE LAYER
  title: string = 'knowledge-quest';
  items: item[] = [];
  test: string = 'testing'

  constructor(
    private firestore: Firestore,
  ) {
  }

  ngOnInit(): void {
    var itemCollection = collection(this.firestore, 'items');
    console.log(itemCollection)
    var data = collectionData<item>(itemCollection, { name: 'test' });
    data.subscribe((data: item[]) => this.items = data)
  }

  async onCreateItem(name: string) {

    var item: item = {
      name: name,
      createdOn: Date.now().toString(),
    }

    var docRef = await addDoc(collection(this.firestore, 'items'), item);

    console.log('Doc written with ID: ', docRef.id)
  }
}
