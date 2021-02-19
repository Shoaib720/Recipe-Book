import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService, AuthResponseData } from '../authentication.service';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';



@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  alertCloseSub: Subscription;

  @ViewChild(PlaceholderDirective , { static: false}) alertHost: PlaceholderDirective;

  private email: string;
  private password: string;

  isLogin = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private cmpFactRes: ComponentFactoryResolver
    ) { }


  ngOnInit(): void {
  }

  onSwitch(){
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm){
    let authObs: Observable<AuthResponseData>;
    this.error = null;
    this.email = form.value.email;
    this.password = form.value.password;
    this.isLoading = true;
    if (this.isLogin){
      if (!form.valid){
        return;
      }
      authObs = this.authService.login(this.email, this.password);
    }else{
      if (!form.valid){
        return;
      }
      authObs = this.authService.signup(this.email, this.password);
    }
    authObs.subscribe(
      (resData: AuthResponseData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, (errorMessage) => {
        this.isLoading = false;
        this.addAlertComponent(errorMessage);
        this.error = errorMessage;
      }
    );
    form.reset();
  }

  onClosed(){
    this.error = null;
  }

  addAlertComponent(message: string){
    const alertCompFact =  this.cmpFactRes.resolveComponentFactory(AlertComponent);
    const alertViewRef = this.alertHost.viewContRef;
    alertViewRef.clear();
    const componentRef = alertViewRef.createComponent(alertCompFact);
    componentRef.instance.error = message;
    this.alertCloseSub = componentRef.instance.closed.subscribe(() => {
      alertViewRef.clear();
      this.alertCloseSub.unsubscribe();
    });
  }
}
