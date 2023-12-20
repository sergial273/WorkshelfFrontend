import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { EditorialService } from '../../../_services/editorial/editorial.service';

@Component({
  selector: 'app-editorial-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editorial-add.component.html',
  styleUrl: './editorial-add.component.css'
})
export class EditorialAddComponent {

  form: FormGroup;

  invis: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private editorialService: EditorialService,
  ) {
    this.form = this.formBuilder.group({
      editorialName: [null, Validators.required],
    });
  }

onSubmit() {
  const editorialNameControl = this.form.get('editorialName');

  if (!editorialNameControl) {
    console.error('editorialName control is null');
    return;
  }

  const trimmedValue = editorialNameControl.value ? editorialNameControl.value.trim() : '';

  if (trimmedValue === '') {
    console.log('Search term is required');
    this.invis = true;
    return;
  }

  const formData = this.form.value;
  this.editorialService.addEditorial(formData).subscribe(
    response => {
      console.log('Result:', response);
      this.router.navigate(['/']);
    },
    error => {
      console.error('Error:', error);
    }
  );
}
}
