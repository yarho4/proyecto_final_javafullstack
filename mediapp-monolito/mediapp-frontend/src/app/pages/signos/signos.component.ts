import { Component, OnInit, ViewChild } from '@angular/core';
import { SignosService } from '../../services/signos.service';
import { Signos } from '../../model/signos';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-signos',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './signos.component.html',
  styleUrl: './signos.component.css',
})
export class SignosComponent implements OnInit {
  //signoss: Signos[];
  dataSource: MatTableDataSource<Signos>;
  columnDefinitions = [
    { def: 'idSignos', label: 'idSignos', hide: true},
    { def: 'fecha', label: 'fecha', hide: false},
    { def: 'patient', label: 'patient', hide: false},
    { def: 'temperatura', label: 'temperatura', hide: false},
    { def: 'pulso', label: 'pulso', hide: false},
    { def: 'ritmo', label: 'ritmo', hide: false},
    { def: 'actions', label: 'actions', hide: false}
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements: number = 0;

  constructor(
    private signosService: SignosService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    /*this.signosService.findAll().subscribe((data) => {
      this.createTable(data);
    });*/

    this.signosService.listPageable(0, 2).subscribe(data => {
      console.log(data);
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    });

    this.signosService.getSignosChange().subscribe((data) => {
      this.createTable(data);
    });

    this.signosService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration: 2000, verticalPosition: 'top', horizontalPosition: 'right'});
    })
  }

  delete(idSignos: number){
    this.signosService.delete(idSignos)
    .pipe(switchMap( ()=> this.signosService.findAll() ))
    .subscribe(data => {
      this.signosService.setSignosChange(data);
      this.signosService.setMessageChange('DELETED!');
    })
  }

  createTable(data: Signos[]) {
    this.dataSource = new MatTableDataSource(data);
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  showMore(e: any){
    this.signosService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    });
  }

  checkChildren(): boolean{
    return this.route.children.length > 0;
  }
}
