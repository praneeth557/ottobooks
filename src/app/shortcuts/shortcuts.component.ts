import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ShortcutsService } from './shortcuts.service';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['name', 'text', 'isAdd'];
  dataSource = new MatTableDataSource();

  shortcuts = [];

  constructor(
    private shortcutsService: ShortcutsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.shortcutsService.getShortcuts().subscribe((res:any) => {
      this.dataSource.data = res;
      console.log(res);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource._renderChangesSubscription;
  }

  addNewRow() {
    console.log(this.dataSource);
    this.dataSource.data.unshift({name: '', text: '', isAdd: true});
  }

  addShortcut(element) {
    console.log(element);
    if(element.name.trim() !== '' && element.text.trim() !== '') {
      this.shortcutsService.postShortcut(element.name, element.text).subscribe(res => {
        this.dataSource.data.shift();
        element.isAdd = false;
        element.isEdit = false;
        this.dataSource.data.unshift(element);
      });
    }
  }

  saveShortcut(element) {
    if(element.id && element.name.trim() !== '' && element.text.trim() !== '') {
      this.shortcutsService.putShortcut(element.id, element.name, element.text).subscribe(res => {
        this.editShortcut(element.id, false);
      });
    }
  }

  editShortcut(id, isEdit) {
    this.dataSource.data.map((d:any) => {
      if(d.id == id) {
        d.isEdit = isEdit;
      }
    });
  }

}
