import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class JwtHelpersService {

    private logger: Logger;
    private activeAccessToken$: ReplaySubject<any> = new ReplaySubject<any>();
    private blacklistedTokens: Set<string> = new Set();
    constructor() {
        this.logger = new Logger(JwtHelpersService?.name);
    }

    public setActiveJWT(jwt: any): Observable<any> | void {
        return this.activeAccessToken$.next(jwt);
      }
    
      public getActiveJWT(): Observable<any> {
        return this.activeAccessToken$.asObservable();
      }


    //To invalidate the JWT
    public addToBlacklist(token: string): void {
        this.blacklistedTokens.add(token);
    }

    public isBlacklisted(token: string): boolean {
        return this.blacklistedTokens.has(token);
    }

}
