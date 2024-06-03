import {
  ComponentFixture,
  TestBed,  
} from '@angular/core/testing';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';
import { MedicComponent } from './medic.component';
import { MaterialModule } from '../../material/material.module';
import { MedicService } from '../../services/medic.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Medic } from '../../model/medic';

describe('MedicComponent', () => {
  let component: MedicComponent;
  let fixture: ComponentFixture<MedicComponent>;
  let mockMedicService: jasmine.SpyObj<MedicService>;

  beforeEach(async () => {
    mockMedicService = jasmine.createSpyObj('MedicService', [
      'findAll',
      'getMedicChange',
      'getMessageChange',
      'delete',
      'setMedicChange', // Agrega esta línea para crear una spy para setMedicChange
      'setMessageChange', // Agrega esta línea para crear una spy para setMessageChange
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MedicService, useValue: mockMedicService },
        { provide: MatDialog, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findAll on init', () => {
    const mockMedics = [
      {
        idMedic: 1,
        primaryName: 'Dr. John',
        surname: 'Doe',
        cmpMedic: '159852',
        photo: 'http:/...',
      },
    ];
    const mockMessage = 'Changed Event!';

    // Mockear la función `findAll` para que retorne un observable válido
    mockMedicService.findAll.and.returnValue(of(mockMedics));
    mockMedicService.getMedicChange.and.returnValue(of(mockMedics));
    mockMedicService.getMessageChange.and.returnValue(of(mockMessage));

    // Llamar al método `ngOnInit` del componente
    component.ngOnInit();

    // Verificar que `findAll` fue llamado en el servicio
    expect(mockMedicService.findAll).toHaveBeenCalled();
    expect(mockMedicService.getMedicChange).toHaveBeenCalled();
    expect(mockMedicService.getMessageChange).toHaveBeenCalled();

    // Verificar que los datos del dataSource son los esperados
    expect(component.dataSource.data).toEqual(mockMedics);
  });

  it('should create table with data', () => {
    const mockMedics = [
      {
        idMedic: 1,
        primaryName: 'Dr. John',
        surname: 'Doe',
        cmpMedic: '159852',
        photo: 'http:/...',
      },
    ];

    component.createTable(mockMedics);

    expect(component.dataSource.data).toEqual(mockMedics);
  });

  it('should apply filter correctly', () => {
    const mockMedics = [
      {
        idMedic: 1,
        primaryName: 'Dr. John',
        surname: 'Doe',
        cmpMedic: '159852',
        photo: 'http:/...',
      },
    ];

    component.createTable(mockMedics);

    component.applyFilter({ target: { value: 'Dr' } });

    expect(component.dataSource.filteredData.length).toEqual(1);
  });

  it('should get displayed columns correctly', () => {
    const displayedColumns = component.getDisplayedColumns();

    expect(displayedColumns).toEqual(['primaryName', 'surname', 'actions']);
  });

  it('should open dialog with correct data', () => {
    const mockMedic: Medic = {
      idMedic: 1,
      primaryName: 'Dr. John',
      surname: 'Doe',
      cmpMedic: '159852',
      photo: 'http:/...',
    };

    spyOn(component['_dialog'], 'open');

    component.openDialog(mockMedic);

    expect(component['_dialog'].open).toHaveBeenCalledWith(
      MedicDialogComponent,
      {
        width: '350px',
        data: mockMedic,
        disableClose: false,
      }
    );
  });

  it('should delete medic', () => {
    const mockMedics = [
      {
        idMedic: 1,
        primaryName: 'Dr. John',
        surname: 'Doe',
        cmpMedic: '159852',
        photo: 'http:/...',
      },
    ];

    // Configurar el comportamiento de delete en el servicio
    mockMedicService.delete.and.returnValue(of(null));
    mockMedicService.findAll.and.returnValue(of(mockMedics));

    // Llamar al método delete del componente
    component.delete(1); // Suponiendo que el idMedic es 1

    // Verificar que delete fue llamado en el servicio con el idMedic correcto
    expect(mockMedicService.delete).toHaveBeenCalledWith(1);

    // Verificar que findAll fue llamado después de delete
    expect(mockMedicService.findAll).toHaveBeenCalled();

    // Verificar que setMedicChange y setMessageChange fueron llamados
    expect(mockMedicService.setMessageChange).toHaveBeenCalledWith('DELETED!');
  });
});
