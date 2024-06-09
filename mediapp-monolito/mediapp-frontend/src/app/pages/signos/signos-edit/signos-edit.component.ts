import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignosService } from '../../../services/signos.service';
import { Signos } from '../../../model/signos';
import { switchMap } from 'rxjs';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../model/patient';

@Component({
  selector: 'app-signos-edit',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signos-edit.component.html',
  styleUrl: './signos-edit.component.css'
})
export class SignosEditComponent implements OnInit{

  form: FormGroup;
  id: number;
  isEdit: boolean;
  minDate: Date = new Date();
  patients: Patient[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signosService: SignosService,
    private patientService: PatientService,
  ){}

  //private route = inject(ActivatedRoute);

  ngOnInit(): void {
      this.form = new FormGroup({
        idSignos: new FormControl(0),
        fecha: new FormControl('', [Validators.required]),
        idPatient: new FormControl('', [Validators.required]),
        temperatura: new FormControl('', [Validators.required]),
        pulso: new FormControl('', [Validators.required]),
        ritmo: new FormControl('', [Validators.required]),
      });      

      this.loadInitialData();
      
      this.route.params.subscribe(data => {
        this.id = data['id'];
        this.isEdit = data['id'] != null;
        this.initForm();
      });
  }
  loadInitialData() {
    this.patientService.findAll().subscribe(data => this.patients = data);
  }

  initForm(){
    if(this.isEdit){
      this.signosService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          idSignos: new FormControl(data.idSignos),
          fecha: new FormControl(data.fecha),
          idPatient: new FormControl(data.patient.idPatient),
          temperatura: new FormControl(data.temperatura),
          pulso: new FormControl(data.pulso),
          ritmo: new FormControl(data.ritmo),       
        });
      });
    }
  }

  operate(){
    if(this.form.invalid){ return; }
    
    const signos: Signos = new Signos();
    signos.idSignos = this.form.value['idSignos'];
    signos.fecha = this.form.value['fecha'];
    signos.patient = new Patient();
    signos.patient.idPatient = this.form.value['idPatient'];
    console.log("el valor de idPatient");
    console.log(this.form.value['idPatient']);
    signos.temperatura = this.form.value['temperatura'];
    signos.pulso = this.form.value['pulso'];
    signos.ritmo = this.form.value['ritmo'];
    
    
    if(this.isEdit){
      //UPDATE
      //PRACTICA COMUN - NO IDEAL
      this.signosService.update(this.id, signos).subscribe( ()=> {
        this.signosService.findAll().subscribe(data => {
          this.signosService.setSignosChange(data);
          this.signosService.setMessageChange('UPDATED!');
        });
      });
    }else{
      //INSERT
      //PRACTICA IDEAL
      this.signosService.save(signos)
      .pipe(switchMap( () => this.signosService.findAll() ))
      .subscribe(data => {
        this.signosService.setSignosChange(data);
        this.signosService.setMessageChange('CREATED!');
      });
    }

    this.router.navigate(['/pages/signos']);
    
  }

  getDate(e: any){
    console.log(e.value);
  }
  
}
