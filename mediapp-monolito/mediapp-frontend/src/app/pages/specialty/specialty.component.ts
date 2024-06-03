import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Specialty } from '../../model/specialty';
import { SpecialtyService } from '../../services/specialty.service';
import { switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-specialty',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.css'
})
export class SpecialtyComponent implements OnInit{

  dataSource: MatTableDataSource<Specialty>;
  columnDefinitions = [
    { def: 'idSpecialty', label: 'idSpecialty', hide: true},
    { def: 'nameSpecialty', label: 'name', hide: false},
    { def: 'descriptionSpecialty', label: 'description', hide: false},    
    { def: 'actions', label: 'actions', hide: false}
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private specialtyService: SpecialtyService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
      this.specialtyService.getSpecialtyChange().subscribe(data => this.createTable(data));

      this.specialtyService.findAll().subscribe(data => this.createTable(data));

      this.specialtyService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}));
  }

  createTable(specialties: Specialty[]){
    this.dataSource = new MatTableDataSource(specialties);    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;        
  }

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();    
  }

  delete(idSpecialty: number){
    this.specialtyService.delete(idSpecialty)
    .pipe(switchMap( ()=> this.specialtyService.findAll() ))
    .subscribe(data => {
      this.specialtyService.setSpecialtyChange(data);
      this.specialtyService.setMessageChange('DELETED!');
    });
  }

  checkChildren(): boolean{
    return this.route.children.length > 0;
  }

}
