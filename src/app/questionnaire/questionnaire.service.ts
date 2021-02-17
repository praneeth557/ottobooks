import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';


export interface IDomain {
  domain_id: string,
  domain_name: string
}

export interface ISubDomain {
  sub_domain_id: string,
  sub_domain_name: string
}

export interface IDomainReq {
  domain: string,
}

export interface IQuestionnaire {
  id: string,
  intent_desc: string,
  priority: number,
  answer?: string,
  isSaving?: boolean,
  isEdit?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private httpClient: HttpClient) { }

  savedQuestions: Array<IQuestionnaire> = [];

  getDomains(prefix: string) {
    return this.httpClient.get(
      Constants.API_ENDPOINT + 'domains?prefix=' + prefix
    );
  }

  getSubDomains(domainId: string) {
    return this.httpClient.get(
      Constants.API_ENDPOINT + 'subdomains?domain_id=' + domainId
    );
  }

  saveDomainAndSubdomain(reqObj: IDomainReq) {
    return this.httpClient.put(
      Constants.API_ENDPOINT + 'companies',
      reqObj
    );
  }

  getQuestionnaire() {
    return this.httpClient.get(
      Constants.API_ENDPOINT + 'questions'
    );
  }

  getSavedQuestions() {
    return this.httpClient.get(
      Constants.API_ENDPOINT + 'answers'
    );
  }

  saveQuestionnaire(questionnaire: IQuestionnaire) {
    return this.httpClient.post(
      Constants.API_ENDPOINT + 'answers',
      questionnaire
    );
  }

  updateQuestionnaire(questionnaire: IQuestionnaire) {
    return this.httpClient.put(
      Constants.API_ENDPOINT + 'answers',
      questionnaire
    );
  }

}
