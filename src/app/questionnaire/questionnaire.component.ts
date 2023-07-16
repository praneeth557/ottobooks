import { Component, OnInit } from '@angular/core';
import { IQuestionnaire, QuestionnaireService } from './questionnaire.service';
import { AuthorizationService } from '../authorization.service';
import { NgForm } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
})
export class QuestionnaireComponent implements OnInit {
  displayedColumns: string[] = ['question', 'answer', 'action'];
  constructor(
    private questionnaireService: QuestionnaireService,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    this.authorizationService.user.subscribe((user) => {
      if (user) this.user = user;
    });
    this.questionnaireService
      .getCompanyQuestionnaire()
      .subscribe((questionnaire: Array<IQuestionnaire>) => {
        this.questionnaire = questionnaire;
      });
  }

  questionnaire: Array<IQuestionnaire> = [];
  user!: User;
  isCreate: boolean = false;
  updatedQ: string = '';
  updatedA: string = '';
  updatedId: string = '';

  onQuestionnaireBlur(questionnaire: IQuestionnaire) {
    if (!questionnaire.answer) {
      return;
    }
    let updatedQuestionList = this.questionnaire.filter(
      (q) => q.id != questionnaire.id
    );
    let quesReq: any = {
      companyid: this.user.companyId,
      intentid: questionnaire.id,
      answer: questionnaire.answer,
    };
    this.questionnaireService.createCompanyQuestion(quesReq).subscribe(
      (quesRes) => {
        this.questionnaire = [...updatedQuestionList];
      },
      (error) => {
        // this.questionnaire = this.questionnaire.map((q) => {
        //   q.isSaving = false;
        //   return q;
        // });
      }
    );
  }

  createQuestionHandler(q: IQuestionnaire) {
    const newQuestion: IQuestionnaire = {
      question: q.question,
      answer: q.answer,
    };
    this.questionnaireService
      .createCompanyQuestion(newQuestion)
      .subscribe((res) => {
        this.questionnaireService
          .getCompanyQuestionnaire()
          .subscribe((questionnaire: Array<IQuestionnaire>) => {
            this.questionnaire = questionnaire;
          });
      });
  }

  updateQuestionHandler(id: string) {
    const updatedQuestion: IQuestionnaire = {
      id: id,
      question: this.updatedQ,
      answer: this.updatedA,
    };
    this.questionnaireService
      .updateQuestionnaire(updatedQuestion)
      .subscribe((res) => {
        this.updatedId = '';
        this.updatedQ = '';
        this.updatedA = '';
        this.questionnaireService
          .getCompanyQuestionnaire()
          .subscribe((questionnaire: Array<IQuestionnaire>) => {
            this.questionnaire = questionnaire;
          });
      });
  }

  addNewQuestionHandler(newQuestionForm: NgForm) {
    const newQuestionData: any = {
      question: newQuestionForm.value.question,
      answer: newQuestionForm.value.answer,
    };

    this.questionnaireService
      .createCompanyQuestion(newQuestionData)
      .subscribe((questionResponse) => {
        newQuestionForm.reset();
      });
  }

  onEditHandler(id: string, val: boolean) {
    this.questionnaire.forEach((question: IQuestionnaire) => {
      if (question.id === id) {
        question.isEdit = val;
      }
      return question;
    });
  }

  onCreateNewHandler() {
    if (
      this.questionnaire &&
      this.questionnaire.length &&
      this.questionnaire[0].id === '0'
    ) {
      return;
    }
    const newQuestion: IQuestionnaire = {
      id: '0',
      question: '',
      answer: '',
      isNew: true,
    };
    this.questionnaire.unshift(newQuestion);
  }

  onCancelAddHandler() {
    this.questionnaire.shift();
  }
}
