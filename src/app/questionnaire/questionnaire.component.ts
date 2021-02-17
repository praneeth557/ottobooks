import { Component, OnInit } from '@angular/core';
import { IQuestionnaire, QuestionnaireService } from './questionnaire.service';
import { AuthorizationService } from '../authorization.service';
import { User } from '../user';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  constructor(
    private questionnaireService: QuestionnaireService,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    this.authorizationService.user.subscribe(user => {
      if(user) this.user = user;
    });
    this.questionnaireService.getQuestionnaire().subscribe((questionList: any) => {
      this.questionList = questionList;
    });
  }

  questionList: Array<IQuestionnaire> = [];
  user!: User;

  onQuestionnaireBlur(questionnaire: IQuestionnaire) {
    if(!questionnaire.answer){
      return;
    }
    let updatedQuestionList = this.questionList.filter(q => q.id != questionnaire.id);
    let quesReq: any = {
      companyid : this.user.companyId,
      intentid : questionnaire.id,
      answer : questionnaire.answer
    } 
    this.questionnaireService.saveQuestionnaire(quesReq).subscribe(quesRes => {
      this.questionList = [...updatedQuestionList];
    },error => {
      this.questionList = this.questionList.map(q => { 
        q.isSaving = false;
        return q;
      });
    });
  }

}
