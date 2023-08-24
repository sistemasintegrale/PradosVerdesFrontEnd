import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  public registerForm!: FormGroup;
  public formSubmitted = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public usuario: UsuarioData,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,) {

    this.registerForm = this.fb.group({
      pass1: new FormControl(this.usuario ? this.usuario.usua_password_usuario : '', [Validators.required]),
      pass2: new FormControl('', [Validators.required]),
      newPass1: new FormControl('', [Validators.required]),
      newPass2: new FormControl('', [Validators.required]),
    }, {
      validators: [this.passAntiguosIguales(), this.passNuevoIguales()]
    });

  }

  passAntiguosIguales() {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get('pass1');
      const pass2Control = formGroup.get('pass2');
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }

  passNuevoIguales() {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get('newPass1');
      const pass2Control = formGroup.get('newPass2');
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }

  passAnteriorNoValidas() {
    const pass1 = this.registerForm.get('pass1')?.value;
    const pass2 = this.registerForm.get('pass2')?.value;
    return pass1 !== pass2 && this.formSubmitted;
  }
  passNuevoNoValidas() {
    const pass1 = this.registerForm.get('newPass1')?.value;
    const pass2 = this.registerForm.get('newPass2')?.value;
    return pass1 !== pass2 && this.formSubmitted;
  }

  campoNoValido(campo: string): boolean {
    const val = this.registerForm.get(campo)?.invalid! && this.formSubmitted;
    return val;
  }
   
  close() {
    this.dialogRef.close({update :false});
  }

  save() {
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;
      this.dialogRef.close({update :true, newPasss :  this.registerForm.get('newPass1')?.value});
  }
}
