import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() questionnaire: Array<IQuestion>;
  @Input() id: string;
  @Output() update = new EventEmitter<IQuestionnaire>();
  @Output() create = new EventEmitter<IQuestionnaire>();

  isCreate: boolean = false;
  user!: User;
  updatedQ: string = '';
  updatedA: string = '';
  updatedId: string = '';

  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    this.authorizationService.user.subscribe((user) => {
      if (user) this.user = user;
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
    this.updatedQ = '';
    this.updatedA = '';
    this.updatedId = '';
    this.questionnaire.unshift(newQuestion);
  }

  onCancelAddHandler() {
    this.questionnaire.shift();
  }

  createQuestionHandler() {
    const newQuestion: any = {
      question: this.updatedQ,
      answer: this.updatedA,
      productId: this.id,
    };
    this.create.emit(newQuestion);
    this.isCreate = false;
  }

  updateQuestionHandler(id: string): void {
    const updatedQuestion: any = {
      id: id,
      question: this.updatedQ,
      answer: this.updatedA,
      productId: this.id,
    };
    this.update.emit(updatedQuestion);
    this.updatedId = '';
  }
}
