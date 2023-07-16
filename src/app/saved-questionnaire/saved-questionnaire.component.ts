import { Component, OnInit } from '@angular/core';
import {
  IQuestionnaire,
  QuestionnaireService,
} from '../questionnaire/questionnaire.service';
import { AuthorizationService } from '../authorization.service';
import { User } from '../user';

export interface IQuestion {
  id?: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-saved-questionnaire',
  templateUrl: './saved-questionnaire.component.html',
  styleUrls: ['./saved-questionnaire.component.css'],
})
export class SavedQuestionnaireComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.authorizationService.user.subscribe((user) => {
      if (user) this.user = user;
    });
    this.questionnaireService
      .getCompanyQuestionnaire()
      .subscribe((questions: any) => {
        this.questionnaire = questions;
      });
  }

  questionnaire: Array<IQuestion> = [];
  user!: User;

  onQuestionnaireUpdate(questionnaire: IQuestion) {
    // let quesReq: any = {
    //   companyid: this.user.companyId,
    //   intentid: questionnaire.intent_id,
    //   answer: questionnaire.answer,
    // };
    // this.questionnaireService.updateQuestionnaire(quesReq).subscribe(
    //   (quesRes) => {},
    //   (error) => {}
    // );
  }
}
