import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collectionData, collection, addDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { item } from './shared/models/item.model';
import { CommonModule } from '@angular/common';
import { namedQuery } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // DEMONSTRATION ONLY - FIRESTORE LOGIC SHOULD BE MOVED TO A SERVICE LAYER
  title: string = 'knowledge-quest';
  items: item[] = [];
  test: string = 'testing'

  constructor(
    private firestore: Firestore,
  ) {
  }

  ngOnInit(): void {
    console.log('fetching data...' + import.meta.env['NG_FIREBASE_MESSAGING_SENDER_ID'])
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

