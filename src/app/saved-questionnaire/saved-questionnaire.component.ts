import { Component, OnInit } from '@angular/core';
import { IQuestionnaire, QuestionnaireService } from '../questionnaire/questionnaire.service';
import { AuthorizationService } from '../authorization.service';
import { User } from '../user';

export interface ISavedQ {
  intent_id: string, 
  intent_desc: string, 
  answer: string, 
  isEdit?: boolean
}

@Component({
  selector: 'app-saved-questionnaire',
  templateUrl: './saved-questionnaire.component.html',
  styleUrls: ['./saved-questionnaire.component.css']
})
export class SavedQuestionnaireComponent implements OnInit {

  constructor(
    private questionnaireService: QuestionnaireService,
    private authorizationService: AuthorizationService  
  ) { }

  ngOnInit(): void {
    this.authorizationService.user.subscribe(user => {
      if(user) this.user = user;
    });
    this.questionnaireService.getSavedQuestions().subscribe((questions:any) => {
      this.savedQuestions = questions;
    });
  }

  savedQuestions: Array<ISavedQ> = [];
  user!: User;

  onQuestionnaireUpdate(questionnaire: ISavedQ) {
    let quesReq: any = {
      companyid : this.user.companyId,
      intentid : questionnaire.intent_id,
      answer : questionnaire.answer
    } 
    this.questionnaireService.updateQuestionnaire(quesReq).subscribe(quesRes => {
      
    },error => {
      
    });
  }

}
