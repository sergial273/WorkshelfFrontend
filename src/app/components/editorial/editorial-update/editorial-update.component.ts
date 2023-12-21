import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { EditorialService } from '../../../_services/editorial/editorial.service';


@Component({
  selector: 'app-editorial-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editorial-update.component.html',
  styleUrl: './editorial-update.component.css'
})
export class EditorialUpdateComponent {
  
  form: FormGroup; 
  editorial: any;
  invis: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private editorialService: EditorialService,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      editorialName: [null],
    });
    this.route.params.subscribe(params => {
      const editorialId = params['id'];
      this.getEditorialDetails(editorialId);
    });
  }

  
  // ngOnInit() {
  //   this.editorialService.getAllEditorials().subscribe(
  //     (editorials: Editorial[]) => {
  //       this.editorials = editorials;
  //       console.log('Editorials:', editorials);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching editorials:', error);
  //     }
  //   );
  //   this.route.params.subscribe(params => {
  //     const bookId = params['id'];
  //     this.getBookDetails(bookId);
  //   });
  // }

  private initializeForm() {
    this.form.patchValue({
      editorialName: this.editorial.editorialName || '', 

      
    });
  }

  getEditorialDetails(editorialId: number) {
    this.editorialService.getEditorialByIdNumber(editorialId).subscribe((data: any) => {
      this.editorial = data;
      console.log(data)
      this.initializeForm();
    });
  }

  onSubmit() {
    const editorialNameControl = this.form.get('editorialName');

    if (!editorialNameControl) {
      console.error('editorialName control is null');
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
