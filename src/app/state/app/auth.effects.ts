import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService, UsersService } from '@tintto/data-lib';
import { signIn, signInFailure, signInSuccess } from './app.actions';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';
import { getUserSuccess } from '../user/user.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private userService = inject(UsersService);

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap((credentials) =>
        this.authService
          .signIn({
            email: credentials.email,
            password: credentials.password,
          })
          .pipe(
            map((authData) =>
              signInSuccess({
                accessToken: authData.access_token ?? '',
                refreshToken: authData.refresh_token ?? '',
              })
            ),
            catchError((error) => {
              let errorResponse = {
                message: 'Some error has occured',
                error: error,
              };
              console.log(error);

              if (error.errors && error.errors.length > 0)
                errorResponse = {
                  ...errorResponse,
                  message: error.errors.map((x: any) => x.message).join('\n'),
                };
              return of(
                signInFailure({
                  message: errorResponse.message,
                })
              );
            })
          )
      )
    )
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      switchMap(() =>
        this.userService.getUser().pipe(
          map((user) =>
            getUserSuccess({
              user: user,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
