import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubjectResponse} from '../../../../models/subject.interface';
import {SubjectService} from '../../../../core/services/subject.service';
import {CommonModule} from '@angular/common';
import {SubjectTreeItemComponent} from './subject-tree-item.component';

@Component({
  selector: 'app-subject-tree',
  imports: [
    CommonModule,
    SubjectTreeItemComponent
  ],
  templateUrl: './subject-tree.component.html'
})
export class SubjectTreeComponent implements OnInit {
  @Input() editionId: number | null = null;
  @Output() subjectSelected = new EventEmitter<SubjectResponse>();

  subjects: SubjectResponse[] = [];

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    if (this.editionId) {
      this.loadSubjects();
    }
  }

  loadSubjects() {
    this.subjectService.getSubjectsBySurveyEditionId(this.editionId!)
      .subscribe({
        next: (subjects) => {
          this.subjects = subjects;
        },
        error: (error) => console.error('Error loading subjects:', error)
      });
  }

  onSubjectSelect(subject: SubjectResponse) {
    this.subjectSelected.emit(subject);
  }
}
