import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/model/user';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public currentUser: User;
  public currentCountry: any = null;
  public nForm: FormGroup;

  public listCountries = []
  public listTimeZones = []
  public modalCropper;

  public isSubmmited: boolean;

  constructor(private formBuilder: FormBuilder, private apiRequestService: ApiRequestService,
    private ngxService: NgxUiLoaderService, public translate: TranslateService,
    private profileService: ProfileService) { }


  public toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: false,
  })

  ngOnInit() {
    this.isSubmmited = false;
    this.currentUser = new User();
    this.ngxService.start();
    this.apiRequestService.GET()
      .then((data: any) => {
        this.currentUser.fromObj(data);
        if (isNullOrUndefined(this.currentUser.firstName) && isNullOrUndefined(this.currentUser.email)) {
          this.currentUser.base64 = "assets/img/avatar1.png";
        } else this.currentCountry = this.currentUser.country;
        this.nForm = this.formBuilder.group({
          firstName: [this.currentUser.firstName, [Validators.required, Validators.maxLength(50)]],
          lastName: [this.currentUser.lastName, [Validators.required, Validators.maxLength(206)]],
          email: [this.currentUser.email, [Validators.required, Validators.email]],
          enrollment: [this.currentUser.enrollment, [Validators.required, Validators.minLength(3)]],
          cellPhone: [this.currentUser.cellPhone, [Validators.required]],
          department: [this.currentUser.department, [Validators.required]],
          country: [this.currentUser.country, [Validators.required]],
          timezone: [this.currentUser.timezone, [Validators.required]],
        });
        this.ngxService.stop();

        this.profileService.setUser(this.currentUser);
      }).catch(error => {
        this.ngxService.stop();
        console.log(error);
      })

    this.onLoadCountries();
    this.onCountryChange();
  }

  onLoadCountries() {
    this.apiRequestService.GetLocalJSON("assets/json/countries.json")
      .then((data: any) => {
        if (Array.isArray(data)) {
          this.listCountries = data.map((country: any) => {
            return {
              id: country.ddi,
              flag: country.img,
              name: country.pais
            }
          });

          this.listCountries.sort()
        }
      }).catch(error => {
        console.log(error);
      })
  }

  onCountryChange() {
    this.apiRequestService.GetLocalJSON("assets/json/timezones.json")
      .then((data: any) => {
        if (Array.isArray(data)) {
          this.listTimeZones = data.map((timezone: any) => {
            return {
              id: timezone.abbr,
              name: timezone.text
            }
          });
        }
      }).catch(error => {
        debugger
        this.ngxService.stop();
        console.log(error);
      })
  }
  isInvalid(name): boolean {
    return this.nForm.controls[name].status.toUpperCase().includes("INVALID") && this.isSubmmited == true;
  }
  onSave() {
    this.isSubmmited = true
    if (this.nForm.invalid) {
      return
    }
    for (let k in this.nForm.controls) {
      this.currentUser[k] = this.nForm.controls[k].value;
    }
    let that = this;
    let title = that.translate.instant('confirm') + " " + that.translate.instant('save');
    let txt = that.translate.instant('confirm-message');
    Swal.fire({
      icon: 'question',
      title: title,
      text: txt,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn btn-success ms-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    }).then((result) => {
      this.isSubmmited = false;
      if (result.isConfirmed) {
        this.apiRequestService.POST(this.currentUser)
          .then((data: any) => {
            that.toast.fire({
              text: that.translate.instant('profile-saved'),
              icon: 'success',
            })
            that.profileService.setUser(this.currentUser);
          }).catch(error => {
            this.ngxService.stop();
            console.log(error);
            that.toast.fire({
              text: that.translate.instant('profile-not-saved'),
              icon: 'error',
            })
          })
      }
    })
  }


  onOpenModalImg() {
    this.modalCropper = new bootstrap.Modal(document.getElementById("modalCropper"), {
      keyboard: false,
      backdrop: 'static'
    })
    this.modalCropper.show();
  }

  onSetProfileImg(even) {
    this.currentUser.base64 = even;
    this.modalCropper.hide();
  }

}
